const authHooks = require('feathers-authentication-hooks');

module.exports = {
  adminsOnly,
  adminsOrOwners,
  owners
};

function adminsOnly() {
  return authHooks.restrictToRoles({
    roles: 'admin',
    fieldName: 'type'
  });
}

function adminsOrOwners(ownerField) {
  return authHooks.restrictToRoles({
    roles: 'admin',
    fieldName: 'type',
    owner: true,
    ownerField
  });
}

function owners(ownerField) {
  return authHooks.restrictToOwner({
    idField: '_id',
    ownerField
  });
}
