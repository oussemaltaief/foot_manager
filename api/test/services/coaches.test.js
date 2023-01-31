const assert = require('assert');
const app = require('../../src/app');

describe('\'coaches\' service', () => {
  it('registered the service', () => {
    const service = app.service('coaches');

    assert.ok(service, 'Registered the service');
  });
});
