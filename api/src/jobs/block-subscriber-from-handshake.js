const soap = require('soap');
const logger = require('../logger');
const errPat = /<Error +Type="([SEW])">\s*<Number>(.*)<\/Number>\s*(<Description>(.*)<\/Description>)?/is;
const setupTelegram = require('./set-up-telegram');
module.exports = async function sendSubscriberToHandshake(job, done) {
  const { id, action } = job.attrs.data;
  const wsdl = this.get('handshake').wsdl;

  if (!id || !action) {
    logger.warning(
      `blockSubscriber: skipping job with invalid data ${job.attrs.data}.`
    );

    done();
    return;
  }

  if (!wsdl || wsdl === 'HANDSHAKE_WSDL') {
    logger.warning(
      `blockSubscriber: handshake server wsdl not configured, not blocking Subscriber ${id}.`
    );

    done();
    return;
  }

  logger.info(`blockSubscriber: blocking Subscriber ${id} from handshake.`);
  const url = 'http://91.230.2.222:5017/ImporterWebService';
  try {
    const client = await soap.createClientAsync(wsdl, { endpoint: url });
    const subscriber = await this.api.service('subscribers').get(id);
    const xmlEnvelope = setupTelegram.getBlockedSubscriber(action, subscriber);
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

    logger.info(
      `blockSubscriberFromHandshake: Subscriber ${id} blocked from handshake.`
    );
    done();
  } catch (err) {
    logger.error('blockSubscriberFromHandshake', {
      err: err.toString() || err.message
    });

    // if attendee or event were not found, don't retry.
    if (err && err.code === 404) {
      return done();
    }

    this.get('jobs').blockSubscriber.retry(job.attrs.data);
    done(err);
  }
};
