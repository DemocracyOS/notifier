const utils = require('../../utils')

const jobName = 'topic-published'
const jobNameForSingleUser = 'topic-published-single-recipient'

module.exports = Promise.all([
  require('../../db').get('users'),
  require('../../agenda')
]).then(([users, agenda]) => {
  agenda.define(jobName, (job, done) => {
    const data = job.attrs.data

    users.find({ 'notifications.new-topic': true }).each((user) => {
      return new Promise((resolve, reject) => {
        agenda.now(jobNameForSingleUser, {
          topic: data.topic,
          url: data.url,
          to: utils.emailAddress(user)
        }, (err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    }).then(() => {
      done()
    }).catch(done)
  })
}).catch((err) => { throw err })
