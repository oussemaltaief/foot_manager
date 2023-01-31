exports.USER_TYPES = {
  ADMIN: 'admin',
  SITE_MANAGER: 'siteManager',
  FINANCE_MANAGER: 'financeManager',
  CASHIER: 'cashier',
  CENTRAL_CASHIER: 'centralCashier'
};

exports.USER_TYPES.ALL = Object.values(exports.USER_TYPES);

exports.EVENTFIELDS = {
  FIELDS: {
    TYPES: ['string', 'list', 'email', 'cascader', 'tags', 'toggle', 'file', 'evaluation', 'map']
  }
};

exports.GENDER = {
  MALE: 'm',
  FEMALE: 'f'
};

exports.GENDER.ALL = Object.values(exports.GENDER);

exports.POS_TYPES = {
  ONLINE: 'ONLINE',
  POS0: 'POS0'
};

exports.POS_TYPES.ALL = Object.values(exports.POS_TYPES);

exports.PRODUCT_TYPES = {
  TICKET: 'ticket',
  CARD: 'card',
  FLAT: 'flat',
  SUBSCRIPTION: 'subscription'
};

exports.PRODUCT_TYPES.ALL = Object.values(exports.PRODUCT_TYPES);

exports.SUBS_VALIDITY = {
  MONTH: 'month',
  QURTER: 'quarter',
  SEMESTER: 'semester',
  YEAR: 'year'
};

exports.SUBS_VALIDITY.ALL = Object.values(exports.SUBS_VALIDITY);

exports.HANDSHAKE = {
  BADGE_TYPE: {
    Abonnement: 'A',
    'Pass évènement': 'E',
    'Pass jour': 'J',
    Organisateur: 'O',
    TECH: 'T'
  },
  GENDER: {
    Monsieur: 'M',
    Madame: 'Mme'
  }
};

exports.ROLES = {
  USERS_CREATE: 'users-create',
  USERS_UPDATE: 'users-update',
  USERS_DELETE: 'users-delete',
  USERS_READ: 'users-read',
};

exports.ROLES.ALL = Object.values(exports.ROLES);
