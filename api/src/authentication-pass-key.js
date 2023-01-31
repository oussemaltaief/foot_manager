/**
 * Strategy for authenticating users by their pass key ('passKey' field).
 *
 * Payload: {"strategy": "pass-key", "key": "<pass key>"}
 */
const local = require('@feathersjs/authentication-local');

class CustomVerifier extends local.Verifier {
  verify(req, username, password, done) {
    const service = this.app.service(this.options.service);
    const key = username;
    service
      .find({
        query: {
          passKey: key
        }
      })
      .then(result => this._normalizeResult(result))
      .then(user => {
        return done(null, user, {
          [`${this.options.entity}Id`]: user[service.id]
        });
      })

      .catch(error => {
        return error
          ? done(error)
          : done(null, error, {
            message: 'Invalid login'
          });
      });
  }
}

function init() {
  return local({
    name: 'pass-key',
    usernameField: 'key',
    Verifier: CustomVerifier
  });
}

init.hooks = {
  // no need to send a password for pass-key strategy, but base local strategy needs one
  addPassword: function(hook) {
    if (hook.data.strategy === 'pass-key') {
      hook.data.password = 'dummy';
    }
  }
};

module.exports = init;
