const assert = require('assert');
const app = require('../../src/app');

describe('\'partners\' service', () => {
  it('registered the service', () => {
    const service = app.service('partners');

    assert.ok(service, 'Registered the service');
  });
});
