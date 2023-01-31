const assert = require('assert');
const app = require('../../src/app');

describe('\'familyGroupe\' service', () => {
  it('registered the service', () => {
    const service = app.service('family-groupe');

    assert.ok(service, 'Registered the service');
  });
});
