const assert = require('assert');
const app = require('../../src/app');

describe('\'fieldsConfig\' service', () => {
  it('registered the service', () => {
    const service = app.service('fields-config');

    assert.ok(service, 'Registered the service');
  });
});
