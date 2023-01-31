const assert = require('assert');
const app = require('../../src/app');

describe("'users' service", () => {
  it('registered the service', () => {
    const service = app.api.service('users');

    assert.ok(service, 'Registered the service');
  });
});
