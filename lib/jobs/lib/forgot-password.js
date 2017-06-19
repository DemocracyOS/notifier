const t = require('t-component')
const utils = require('../../utils')
const templates = require('../../templates')
const mailer = require('../../mailer')

const jobName = 'forgot-password'
const template = templates[jobName]

module.exports = Promise.all([
  require('../../db'),
  require('../../agenda')
]).then((results) => {
  const db = results[0]
  const agenda = results[1]

  agenda.define(jobName, (job, done) => {
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
          RESET_PASSWORD_URL: data.resetUrl
        }, {
          lang: user.locale
        }),
        subject: t(`templates.${jobName}.subject`)
      }).then(done).catch(done)
    })
  })
}).catch((err) => { throw err })
