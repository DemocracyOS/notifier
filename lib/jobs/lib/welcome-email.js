const t = require('t-component')
const utils = require('../../utils')
const templates = require('../../templates')
const mailer = require('../../mailer')

const jobName = 'welcome-email'
const template = templates[jobName]

module.exports = Promise.all([
  require('../../db'),
  require('../../agenda')
]).then(([db, agenda]) => {
  agenda.define(jobName, { priority: 'high' }, welcomeEmailJob)
  agenda.define('signup', { priority: 'high' }, welcomeEmailJob)
  agenda.define('resend-validation', { priority: 'high' }, welcomeEmailJob)

  function welcomeEmailJob (job, done) {
    const data = job.attrs.data

    db.users.findOne({ email: data.to }, (err, user) => {
      if (err) return done(err)

      if (!user) {
        return done(new Error(`User not found for email "${data.email}"`))
      }

      mailer.send({
        to: utils.emailAddress(user),
        html: template({
          USER_NAME: user.firstName,
          VALIDATE_MAIL_URL: data.validateUrl
        }, {
          lang: user.locale
        }),
        subject: t(`templates.${jobName}.subject`)
      }).then(done).catch(done)
    })
  }
}).catch((err) => { throw err })
