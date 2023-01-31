const soap = require('soap');
const errPat = /<Error +Type="([SEW])">\s*<Number>(.*)<\/Number>\s*(<Description>(.*)<\/Description>)?/is;
const logger = require('../logger');


async function resendTSP(env) {
  try {
    const url = 'http://91.230.2.222:5017/ImporterWebService';
    const wsdl = 'http://91.230.2.222:5017/ImporterWebService?singleWsdl';
    const client = await soap.createClientAsync(wsdl, { endpoint: url });
    console.log('HS ENV', env, 'HS ENV');
    let result = await client.ProcessRequestAsync({ request: env });
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
      `send TSP ToHandshake: TSP sent to handshake.`
    );
  } catch (err) {
    logger.error('send TSP ToHandshake', {
      err: err.toString() || err.message
    });
    throw new Error(
      `Handshake error. Type: ${err}, number: ${err}, description: ${err}.`
    );
  }

}

module.exports = {
  resendTSP

};
