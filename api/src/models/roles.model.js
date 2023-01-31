// roles-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const access = {
  create: { label: String, value: Boolean },
  read: { label: String, value: Boolean },
  update: { label: String, value: Boolean },
  delete: { label: String, value: Boolean }
};

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const roles = new Schema(
    {
      name: { type: String, required: true, index: true },
      abbreviation: { type: String, required: true, index: true },
      accessControl: [String]
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('roles');
  } catch (e) {
    return mongooseClient.model('roles', roles);
  }
};
