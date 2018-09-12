const t = require('t-component')
const templates = require('../../templates')
const utils = require('../../utils')

const jobName = 'topic-published'
const jobNameForSingleUser = 'topic-published-single-recipient'

module.exports = function topicPublished (notifier) {
  const { db, agenda, mailer } = notifier
  const users = db.get('users')

  agenda.define(jobName, (job, done) => {
    const { topic, url } = job.attrs.data

    users.find({ 'notifications.new-topic': true }).each((user) => {
      return new Promise((resolve, reject) => {
        agenda.now(jobNameForSingleUser, {
          topic,
          url,
          to: utils.emailAddress(user),
          locale: user.locale
        }, (err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    }).then(() => { done() }).catch(done)
  })

  agenda.define(jobNameForSingleUser, (job, done) => {
    const { to, topic, url, locale } = job.attrs.data

    const html = templates[jobName]({
      userName: to.name,
      topic: topic.mediaTitle,
      url
    }, {
      lang: locale
    })

    return mailer.send({
      to,
      subject: t(`templates.${jobName}.subject`),
      html
    }).then(() => { done() }).catch(done)
  })
}
