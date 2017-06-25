const t = require('t-component')
const utils = require('../../utils')
const templates = require('../../templates')
const mailer = require('../../mailer')

const jobName = 'forgot-password'
const template = templates[jobName]

module.exports = function forgotPassword (notifier) {
  const { db, agenda } = notifier
  const users = db.get('users')

  agenda.define(jobName, (job, done) => {
    const data = job.attrs.data

    users.findOne({ email: data.to }).then((user) => {
      if (!user) throw new Error(`User not found for email "${data.to}"`)

      return mailer.send({
        to: utils.emailAddress(user),
        html: template({
          userName: user.firstName,
          resetPasswordUrl: data.resetUrl
        }, {
          lang: user.locale
        }),
        subject: t(`templates.${jobName}.subject`)
      })
    }).then(() => { done() }).catch(done)
  })
}
