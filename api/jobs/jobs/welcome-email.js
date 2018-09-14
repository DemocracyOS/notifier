const mailer = require('../../../services/nodemailer');

module.exports = agenda => {
  agenda.define('send welcome', async (job, done) => {
    const { email } = job.attrs.data;
    const {
      NODEMAILER_HOST,
      NODEMAILER_USER, 
      NODEMAILER_PASS } = process.env;

    const config = {
      host: NODEMAILER_HOST,
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
      }
    }    

    const mailOptions = {
      from: `"${process.env.ORGANIZATION_NAME}" <${process.env.ORGANIZATION_EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: 'Welcome to DemocracyOS ✔', // Subject line
      text: '¡Welcome to DemocracyOS!', // plain text body
      html: '<b>¡Welcome to DemocracyOS!</b>' // html body
    };

    try {
      mailer.sendEmail(config, mailOptions);
    } catch (err) {
      done();
    }
  });
};
