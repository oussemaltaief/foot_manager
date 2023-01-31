const soap = require('soap');
const logger = require('../logger');
const errPat = /<Error +Type="([SEW])">\s*<Number>(.*)<\/Number>\s*(<Description>(.*)<\/Description>)?/is;
const setupTelegram = require('./set-up-telegram');
module.exports = async function sendPersonCategoryToHandshake(job, done) {
  const { id, action } = job.attrs.data;
  const wsdl = this.get('handshake').wsdl;
  if (!id || !action) {
    logger.warning(
      `sendNewCategoryToHandshake: skipping job with invalid data ${
        job.attrs.data
      }.`
    );
    done();
    return;
  }
  if (!wsdl || wsdl === 'HANDSHAKE_WSDL') {
    logger.warning(
      `sendNewCategoryToHandshake: handshake server wsdl not configured, not sending Ticket ${id}.`
    );
    done();
    return;
  }
  logger.info(
    `sendNewCategoryToHandshake: sending new Category  ${id} to handshake.`
  );
  const url = 'http://91.230.2.222:5017/ImporterWebService';
  try {
    const client = await soap.createClientAsync(wsdl, { endpoint: url });
    const category = await this.api.service('personcategory').get(id);
    const xmlEnvelope = await setupTelegram.getPersonCategoryEnvelope(
      action,
      category
    );
    console.log('TELEGRAM SENT', xmlEnvelope);
    let result = await client.ProcessRequestAsync({ request: xmlEnvelope });

    const response = result[0];
    console.log('HS RESPONSE', response);
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

    logger.info(
      `sendNewCategoryToHandshake: NewCategory ${id} sent to handshake.`
    );
    done();
  } catch (err) {
    logger.error('sendNewCategoryToHandshake', {
      err: err.toString() || err.message
    });
    // if attendee or event were not found, don't retry.
    if (err && err.code === 404) {
      return done();
    }
    this.get('jobs').sendCategory.retry(job.attrs.data);
    done(err);
  }
};
