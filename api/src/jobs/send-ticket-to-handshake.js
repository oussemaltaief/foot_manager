const soap = require('soap');
const logger = require('../logger');
const errPat = /<Error +Type="([SEW])">\s*<Number>(.*)<\/Number>\s*(<Description>(.*)<\/Description>)?/is;
var moment = require('moment');
moment().format();
module.exports = async function sendTicketToHandshake(job, done) {
  const { id, action } = job.attrs.data;
  const wsdl = this.get('handshake').wsdl;
  if (!id || !action) {
    logger.warning(
      `send tickets To Handshake: skipping job with invalid data ${
        job.attrs.data
      }.`
    );
    done();
    return;
  }

  if (!wsdl || wsdl === 'HANDSHAKE_WSDL') {
    logger.warning(
      `send tickets ToHandshake: handshake server wsdl not configured, not sending station ${id}.`
    );
    done();
    return;
  }
  logger.info(`send tickets ToHandshake: sending  ticket ${id} to handshake.`);
  var xmlEnvelope = '';
  try {
    const order = await this.api.service('orders').get(id);
    let wlRecords = '';
    let line = null;
    for (let i = 0; i < order.lines.length; i++) {
      line = order.lines[i];
      const product = await this.api.service('products').get(line.type);
      const personcategory = line.personCategory;
      const trip = await this.api.service('trips').get(product.trip);
      const tickets = line.tickets;
      wlRecords += await getWlrecods(
        action,
        product,
        trip,
          tickets,
          personcategory,
          order.meta.orderedAt
        );
      }
      xmlEnvelope = await getOrderEnvelope(wlRecords);

    console.log('TELEGRAM SENT', xmlEnvelope, 'TELEGRAM SENT');
    const url = 'http://91.230.2.222:5017/ImporterWebService';
    const client = await soap.createClientAsync(wsdl, { endpoint: url });
    let result = await client.ProcessRequestAsync({ request: xmlEnvelope });
    const response = result[0];
    console.log('HS RESPONSE', response, 'HS RESPONSE');
    const error =
      (response &&
        response.ProcessRequestResult &&
        response &&
        response.ProcessRequestResult.match(errPat)) ||
      null;
    // ignore warnings
    if (error) {
      if (error[1] === 'W') {
        logger.warning(
          `Handshake warning so plz ignore it. Number: ${
            error[2]
          }, description: ${error[4]}.`
        );
      } else {
        throw new Error(
          `Handshake error. Type: ${error[1]}, number: ${
            error[2]
          }, description: ${error[4]}.`
        );
      }
    }
    logger.info(`send tickets ToHandshake: ticket ${id} sent to handshake.`);
    done();
  } catch (err) {
    logger.error('send ticket ToHandshake', {
      err: err.toString() || err.message
    });
    // if attendee or event were not found, don't retry.
    if (err && err.code === 404) {
      return done();
    }
    this.get('jobs').sendTicket.retry(job.attrs.data);
    done(err);
  }
};
// } catch (err) {
//   console.log('error to send hs', err);
// }

function getTicketEnveloppe(ticket, product, trip) {
  return `<TSData>
  <Header>
    <Version>HSHIF25</Version>
    <Issuer>15</Issuer>
    <Receiver>1</Receiver>
    <ID>0</ID>
  </Header> 
  <WhitelistRecord Expire="${formatExpire(ticket.validUntil)}">
      <Action>I</Action>
      <UTID>${ticket.serialNumber}</UTID>          
      <Coding>262</Coding>
      <Permission>
      <UPID>1</UPID>
      <TSProperty Type="TICKETTYPE">
      <ID>${trip._id}</ID>
      </TSProperty>  
      <TSProperty Type="VALIDITY" From="${formatDate(
    ticket.createdAt
  )}" To="${formatDate(ticket.validUntil)}">
      </TSProperty>     
      <TSProperty Type="POINTS">
      <ID>${product.units}</ID>
      </TSProperty>  
      <TSProperty Type="PERSONCATEGORY">
      <ID>${ticket.personCategory}</ID>
      </TSProperty>  
      <TSProperty Type="STARTSTATION">
      <ID>${trip.startStation}</ID>
      </TSProperty>
      <TSProperty Type="ENDSTATION">
      <ID>${trip.endStation}</ID>
      </TSProperty> 
      </Permission>
    </WhitelistRecord>
    </TSData>`;
}

function getWlrecods(
  action,
  product,
  trip,
  tickets,
  personcategory,
  validfrom
) {
  let records = '';
  for (let i = 0; i < tickets.length; i++) {
    records += `<WhitelistRecord Expire="${formatExpire(
      tickets[i].validUntil
    )}">
      <Action>I</Action>
      <UTID>${tickets[i].serialNumber}</UTID>          
      <Coding>262</Coding>
      <Permission>
      <UPID>1</UPID>
      <TSProperty Type="TICKETTYPE">
      <ID>${product._id}</ID>
      </TSProperty>  
      <TSProperty Type="VALIDITY" From="${formatDate(
    validfrom
  )}" To="${formatDate(tickets[i].validUntil)}">
      </TSProperty>     
      <TSProperty Type="POINTS">
      <ID>${product.units}</ID>
      </TSProperty>
      <TSProperty Type="PERSONCATEGORY">
      <ID>${personcategory}</ID>
      </TSProperty>
      <TSProperty Type="STARTSTATION">
      <ID>${trip.startStation}</ID>
      </TSProperty>
      <TSProperty Type="ENDSTATION">
      <ID>${trip.endStation}</ID>
      </TSProperty> 
      </Permission>
    </WhitelistRecord>
    `;
  }
  return records;
}
function getOrderEnvelope(wlRecords) {
  var header = `<TSData>
  <Header>
    <Version>HSHIF25</Version>
    <Issuer>15</Issuer>
    <Receiver>1</Receiver>
    <ID>0</ID>
  </Header> `;
  return header + wlRecords + '</TSData>';
}
function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}
function pad(value) {
  return `${value < 10 ? '0' : ''}${value}`;
}
function formatExpire(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate() 
  )}T${pad(date.getHours()+1)}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

