const utils = require('../../utils')

const jobName = 'topic-published'
const jobNameForSingleUser = 'topic-published-single-recipient'

module.exports = function topicPublished (notifier) {
  const { db, agenda } = notifier
  const users = db.get('users')

  agenda.define(jobName, { priority: 'lowest' }, (job, done) => {
    const { topic, url } = job.attrs.data

    users.find({ 'notifications.new-topic': true }).each((user) => {
      return new Promise((resolve, reject) => {
        agenda.now(jobNameForSingleUser, {
          topic: topic,
          url: url,
          to: utils.emailAddress(user),
          locale: user.locale
        }, (err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    }).then(() => { done() }).catch(done)
  })
}
