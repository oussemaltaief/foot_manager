const soap = require('soap');
const errPat = /<Error +Type="([SEW])">\s*<Number>(.*)<\/Number>\s*(<Description>(.*)<\/Description>)?/is;
const util = require('util');
const bwipjs = require('bwip-js');
const getBarcode = util.promisify(bwipjs.toBuffer);
const logger = require('../logger');

function getImage() {
  return async context => {
    const png = await getBarcode({
      bcid: 'code128', // Barcode type
      text: context.result.serialNumber,
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: 'center' // Always good to set this
    });
    context.result.barcodeImage =
      'data:image/png;base64,' + png.toString('base64');
  };
}

async function checkPointUsage(context) {
  var serialnumber = context.params.query.serialNumber;
  try {
    const wsdl = context.app.settings.handshake.wsdl;
    const url = 'http://91.230.2.222:5017/ImporterWebService';
    const client = await soap.createClientAsync(wsdl, { endpoint: url });
    const enveloppe = await getInquiryEnveloppe(serialnumber);
    console.log('########################', enveloppe);
    let result = await client.ProcessRequestAsync({ request: enveloppe });
    const response = result[0];
    context.result.handshake = response;
    console.log(response);
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
          `Handshake warning. Number: ${error[2]}, description: ${error[4]}.`
        );
      } else {
        throw new Error(
          `Handshake error. Type: ${error[1]}, number: ${
            error[2]
          }, description: ${error[4]}.`
        );
      }
    }
    logger.info('sendTicketToHandshake: Inquiry of Ticket sent to handshake.');
  } catch (err) {
    logger.error('sendTicketToHandshake', {
      err: err.toString() || err.message
    });
  }
}

function getInquiryEnveloppe(serialNumber) {
  var env = `<TSData>
      <Header>
        <Version>HSHIF25</Version>
        <Issuer>15</Issuer>
        <Receiver>1</Receiver>
        <ID>0</ID>
      </Header>   
      <Inquiry Type="Points">
       <UTID>${serialNumber}</UTID>
       <Coding>262</Coding>
       <Permission MultiDC="false">
       <UPID>1</UPID>
       </Permission>    
      </Inquiry>
      </TSData>`;
  return env;
}

function resendTicket() {
  return async context => {
    try {
      const url = 'http://91.230.2.222:5017/ImporterWebService';
      const wsdl = 'http://91.230.2.222:5017/ImporterWebService?singleWsdl';
      const ticket = await context.app.api
        .service('tickets')
        .get(context.data._id);
      console.log(ticket);
      const product = await context.app.api
        .service('products')
        .get(ticket.product);
      const trip = await context.app.api.service('trips').get(product.trip);
      const xmlEnvelope = await getTicketEnveloppe(ticket, product, trip);
      console.log('HS TELEGRAM', xmlEnvelope, 'HS TELEGRAM ');
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
      logger.info(
        `send tickets ToHandshake: ticket ${ticket._id} sent to handshake.`
      );
    } catch (err) {
      logger.error('send ticket ToHandshake', {
        err: err.toString() || err.message
      });
      throw new Error(
        `Handshake error. Type: ${err}, number: ${err}, description: ${err}.`
      );
    }
    return context;
  };
}


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
  )}T${pad(date.getHours() + 1)}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

module.exports = {
  checkPointUsage,
  getImage,
  resendTicket,

};
