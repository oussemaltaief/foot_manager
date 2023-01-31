/* eslint-disable no-console, no-unused-vars */

const faker = require('faker');
const mongoose = require('mongoose');

const {
  USER_TYPES,
  GENDER,
  PRODUCT_TYPES,
  SUBS_VALIDITY
} = require('../src/constants');

// ==== Users ====

exports.users = USER_TYPES.ALL.map(type => ({
  _id: new mongoose.Types.ObjectId(),
  username: type,
  password: '123',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  photo: faker.image.dataUri(200, 200),
  gender: faker.random.arrayElement(GENDER.ALL),
  type: type
}));
