const assert = require('assert');
const app = require('../../src/app');

describe('\'lands\' service', () => {
  it('registered the service', () => {
    const service = app.service('lands');

    assert.ok(service, 'Registered the service');
  });
});
