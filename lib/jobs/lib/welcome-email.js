const t = require('t-component')
const utils = require('../../utils')
const templates = require('../../templates')
const mailer = require('../../mailer')

const jobName = 'welcome-email'
const template = templates[jobName]

module.exports = Promise.all([
  require('../../db').get('users'),
  require('../../agenda')
]).then(([users, agenda]) => {
  agenda.define(jobName, { priority: 'high' }, welcomeEmailJob)
  agenda.define('signup', { priority: 'high' }, welcomeEmailJob)
  agenda.define('resend-validation', { priority: 'high' }, welcomeEmailJob)

  function welcomeEmailJob (job, done) {
    const data = job.attrs.data

    users.findOne({ email: data.to }).then((user) => {
      if (!user) throw new Error(`User not found for email "${data.email}"`)

      const html = template({
        USER_NAME: user.firstName,
        VALIDATE_MAIL_URL: data.validateUrl
      }, {
        lang: user.locale
      })

      return mailer.send({
        to: utils.emailAddress(user),
        subject: t(`templates.${jobName}.subject`),
        html
      })
    }).catch(done)
  }
}).catch((err) => { throw err })
