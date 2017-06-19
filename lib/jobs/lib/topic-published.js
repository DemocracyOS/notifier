const utils = require('../../utils')

const jobName = 'topic-published'
const jobNameForSingleUser = 'topic-published-single-recipient'

module.exports = Promise.all([
  require('../../db'),
  require('../../agenda')
]).then(([db, agenda]) => {
  agenda.define(jobName, (job, done) => {
    const data = job.attrs.data

    db.users.find({ 'notifications.new-topic': true }, (err, users) => {
      if (err) return done(err)

      const workers = users.map((user) => {
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
      })

      Promise.all(workers)
        .then(() => { done() })
        .catch(done)
    })
  })
}).catch((err) => { throw err })
