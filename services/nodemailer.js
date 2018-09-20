const nodemailer = require('nodemailer');

module.exports.sendEmail = function sendEmail(config, mailOptions, done) {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return done(error);
    }

    done();
  });
};
