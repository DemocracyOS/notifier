const t = require('t-component')
const utils = require('../../utils')
const templates = require('../../templates')

const jobName = 'welcome-email'

module.exports = function welcomeEmail (notifier) {
  const { db, agenda, mailer } = notifier
  const users = db.get('users')

  agenda.define(jobName, { priority: 'high' }, welcomeEmailJob)
  agenda.define('signup', { priority: 'high' }, welcomeEmailJob)
  agenda.define('resend-validation', { priority: 'high' }, welcomeEmailJob)

  function welcomeEmailJob (job, done) {
    const data = job.attrs.data

    users.findOne({ email: data.to }).then((user) => {
      if (!user) throw new Error(`User not found for email "${data.to}"`)

      const html = templates[jobName]({
        userName: user.firstName,
        validateUrl: data.validateUrl
      }, {
        lang: user.locale
      })

      return mailer.send({
        to: utils.emailAddress(user),
        subject: t(`templates.${jobName}.subject`),
        html
      })
    }).then(() => { done() }).catch(done)
  }
}
