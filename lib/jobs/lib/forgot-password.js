const t = require('t-component')
const utils = require('../../utils')
const templates = require('../../templates')

const jobName = 'forgot-password'

module.exports = function forgotPassword (notifier) {
  const { db, agenda, mailer } = notifier
  const users = db.get('users')

  agenda.define(jobName, { priority: 'high' }, (job, done) => {
    const data = job.attrs.data

    users.findOne({ email: data.to }).then((user) => {
      if (!user) throw new Error(`User not found for email "${data.to}"`)

      const html = templates[jobName]({
        userName: user.firstName,
        resetPasswordUrl: data.resetUrl
      }, {
        lang: user.locale
      })

      return mailer.send({
        to: utils.emailAddress(user),
        subject: t(`templates.${jobName}.subject`),
        html
      })
    }).then(() => { done() }).catch(done)
  })
}
