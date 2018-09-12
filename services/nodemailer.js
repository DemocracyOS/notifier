const nodemailer = require('nodemailer');

module.exports.sendEmail = function(config, mailOptions) {
  // nodemailer.createTestAccount((err, account) => {

  // });
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw error;
    }
  });
};
