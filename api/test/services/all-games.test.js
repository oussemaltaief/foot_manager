const assert = require('assert');
const app = require('../../src/app');

describe('\'all-games\' service', () => {
  it('registered the service', () => {
    const service = app.service('all-games');

    assert.ok(service, 'Registered the service');
  });
});
