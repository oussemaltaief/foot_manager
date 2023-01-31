const soap = require('soap');
const logger = require('../logger');
const CONST = require('../constants');

const errPat = /<Error +Type="([SEW])">\s*<Number>(.*)<\/Number>\s*(<Description>(.*)<\/Description>)?/is;

module.exports = async function sendBadgeToHandshake(job, done) {
  const { id, action } = job.attrs.data;
  const wsdl = this.get('handshake').wsdl;

  if (!id || !action) {
    logger.warning(
      `sendBadgeToHandshake: skipping job with invalid data ${job.attrs.data}.`
    );

    done();
    return;
  }

  if (!wsdl || wsdl === 'HANDSHAKE_WSDL') {
    logger.warning(
      `sendBadgeToHandshake: handshake server wsdl not configured, not sending badge ${id}.`
    );

    done();
    return;
  }

  logger.info(`sendBadgeToHandshake: sending badge ${id} to handshake.`);

  try {
    const client = await soap.createClientAsync(wsdl);

    const xmlEnvelope = getEnvelope(null, null, action);
    const result = await client.ProcessRequestAsync({ request: xmlEnvelope });
    const response = result[0];

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

    // set skiData prop to true
    // if (!attendee.skiData) {
    //   attendee.skiData = true;

    //   await this.api
    //     .service('attendees')
    //     .update(id, attendee, { skipHandshake: true });
    // }

    logger.info(`sendBadgeToHandshake: badge ${id} sent to handshake.`);
    done();
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    logger.error('sendBadgeToHandshake', {
      err: err.toString() || err.message
    });

    // if attendee or event were not found, don't retry.
    if (err && err.code === 404) {
      return done();
    }

    this.get('jobs').handshake.retry(job.attrs.data);
    done(err);
  }
};

function getEnvelope(attendee, event, action) {
  return `<TSData>
  <Header>
    <Version>HSHIF25</Version>
    <Issuer>1</Issuer>
    <Receiver>1</Receiver>
    <ID>0</ID>
  </Header>
  <WhitelistRecord Expire="${formatDate(event.endTime)}">
    <Action>${action}</Action>
    <UTID>${toString(attendee._id)}</UTID>
    <Coding>270</Coding>
    <Permission>
      <UPID>1</UPID>
      <TSProperty Type="NOM">
        <ID>${getFieldValue(attendee, 'lastName')}</ID>
      </TSProperty>
      <TSProperty Type="PRENOM">
        <ID>${getFieldValue(attendee, 'firstName')}</ID>
      </TSProperty>
      <TSProperty Type="GSM">
        <ID>${getFieldValue(attendee, 'mobile')}</ID>
      </TSProperty>
      <TSProperty Type="TEL">
        <ID>${getFieldValue(attendee, 'phone')}</ID>
      </TSProperty>
      <TSProperty Type="MAIL">
        <ID>${getFieldValue(attendee, 'email')}</ID>
      </TSProperty>
      <TSProperty Type="FONCTION">
        <ID>${getFieldValue(attendee, 'position')}</ID>
      </TSProperty>
      <TSProperty Type="ENTREPRISE">
        <ID>${getFieldValue(attendee, 'company')}</ID>
      </TSProperty>
      <TSProperty Type="SECTEUR">
        <ID>${getFieldValue(attendee, 'sector')}</ID>
      </TSProperty>
      <TSProperty Type="PAYS">
        <ID>${getFieldValue(attendee, 'country')}</ID>
      </TSProperty>
      <TSProperty Type="TYPE_BADGE">
        <ID>${getFieldValue(attendee, 'badgeType')}</ID>
      </TSProperty>
      <TSProperty Type="PCID">
        <ID>${getFieldValue(attendee, 'idNumber')}</ID>
      </TSProperty>
      <TSProperty Type="TYPE_PCID">
        <ID>${getFieldValue(attendee, 'idType')}</ID>
      </TSProperty>
      <TSProperty Type="AGE">
        <ID>${getFieldValue(attendee, 'age')}</ID>
      </TSProperty>
      <TSProperty Type="FAX">
        <ID>${getFieldValue(attendee, 'fax')}</ID>
      </TSProperty>
      <TSProperty Type="GENRE">
        <ID>${getFieldValue(attendee, 'gender')}</ID>
      </TSProperty>
      <TSProperty Type="QRES1">
        <ID>${getFieldLabel(event, 'qres1')}</ID>
      </TSProperty>
      <TSProperty Type="RRES1">
        <ID>${getFieldValue(attendee, 'qres1')}</ID>
      </TSProperty>
      <TSProperty Type="QRES2">
        <ID>${getFieldLabel(event, 'qres2')}</ID>
      </TSProperty>
      <TSProperty Type="RRES2">
        <ID>${getFieldValue(attendee, 'qres2')}</ID>
      </TSProperty>
      <TSProperty Type="QRES3">
        <ID>${getFieldLabel(event, 'qres3')}</ID>
      </TSProperty>
      <TSProperty Type="RRES3">
        <ID>${getFieldValue(attendee, 'qres3')}</ID>
      </TSProperty>
      <TSProperty Type="QRES4">
        <ID>${getFieldLabel(event, 'qres4')}</ID>
      </TSProperty>
      <TSProperty Type="RRES4">
        <ID>${getFieldValue(attendee, 'qres4')}</ID>
      </TSProperty>
      <TSProperty Type="QRES5">
        <ID>${getFieldLabel(event, 'qres5')}</ID>
      </TSProperty>
      <TSProperty Type="RRES5">
        <ID>${getFieldValue(attendee, 'qres5')}</ID>
      </TSProperty>
      <TSProperty Type="EVENT">
        <ID>${toString(event._id)}</ID>
        <Name>${toString(event.title)}</Name>
      </TSProperty>
      <TSProperty Type="SALLE">
        <ID>${toString(event.room)}</ID>
      </TSProperty>
      <TSProperty Type="CAT">
        <ID>${toString(event.category)}</ID>
      </TSProperty>
      <TSProperty Type="POS">
        <ID>${toString(attendee.pos)}</ID>
      </TSProperty>
      <TSProperty Type="REF">
        <ID>${toString(attendee.ref)}</ID>
      </TSProperty>
      <TSProperty Type="ACT">
        <ID>${attendee.active ? '1' : '0'}</ID>
      </TSProperty>
    </Permission>
  </WhitelistRecord>
  </TSData>`;
}

function getFieldValue(attendee, key) {
  const field = attendee.fields.find(field => field.key === key);
  let value = field ? field.value : '';

  switch (key) {
    case 'badgeType':
      value = CONST.HANDSHAKE.BADGE_TYPE[value];
      break;

    case 'gender':
      value = CONST.HANDSHAKE.GENDER[value];
      break;
  }

  return toString(value);
}

function getFieldLabel(event, key) {
  const field = event.fields.find(field => field.key === key);

  return toString(field ? field.label : '');
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

function toString(value) {
  return value ? value.toString() : '00000000';
}
