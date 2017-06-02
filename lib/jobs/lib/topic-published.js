var db = require('../../db')
var name = require('../../utils/name')
var jobs = require('../../jobs')

var jobName = 'topic-published'
var jobNameForSingleUser = 'topic-published-single-recipient'

jobs.define(jobName, function (job, done) {
  var data = job.attrs.data

  db().users.find({ 'notifications.new-topic': true }, function (err, users) {
    if (err) return done(err)

    const workers = users.map((user) => {
      return new Promise((resolve, reject) => {
        jobs.process(jobNameForSingleUser, {
          topic: data.topic,
          url: data.url,
          to: { name: name.format(user), email: user.email }
        }, (err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    })

    Promise.all(workers)
      .then(() => { done(null) })
      .catch(done)
  })
})
