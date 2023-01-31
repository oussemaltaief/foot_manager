const assert = require('assert');
const app = require('../../src/app');

describe('\'fields\' service', () => {
  it('registered the service', () => {
    const service = app.service('fields');

    assert.ok(service, 'Registered the service');
  });
});
