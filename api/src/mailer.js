const nodemailer = require('nodemailer');

module.exports = async function(app) {
  const config = app.get('mailer');

  config.smtpConfig.secure =
    config.smtpConfig.secure === 'true' || config.smtpConfig.secure === true;

  if (config.smtpConfig.auth && config.smtpConfig.auth.user === 'no-auth') {
    delete config.smtpConfig.auth;
  }

  const transporter = nodemailer.createTransport(config.smtpConfig, {
    from: config.from
  });

  app.set('smtp', transporter);
};
