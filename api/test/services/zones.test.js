const assert = require('assert');
const app = require('../../src/app');

describe('\'zones\' service', () => {
  it('registered the service', () => {
    const service = app.service('zones');

    assert.ok(service, 'Registered the service');
  });
});
