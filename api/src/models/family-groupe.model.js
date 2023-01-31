// familyGroupe-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const familyGroupe = new Schema({
    ref: Number,
    city : [String],
    logo : String,
    latlng: { lat : String , lng : String },
    fields: [
      new Schema(
        {
          key: String,
          label: String,
          value: String,
          type : String
        },
        { _id: false }
      )
    ],
    active: { type: Boolean, default: false },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('familyGroupe');
  } catch (e) {
    return mongooseClient.model('familyGroupe', familyGroupe);
  }
};
