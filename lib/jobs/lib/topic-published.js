var db = require('../../db')
var mail = require('../../transports').mail
var log = require('debug')('democracyos:notifier:forgot')
var name = require('../../utils/name')
var async = require('async')
var jobs = require('../../jobs')

var jobName = 'topic-published'
var jobNameForSingleUser = 'topic-published-single-recipient'
var jobNameForUpdateFeed = require('./update-feed.js').jobName

module.exports = function (opts) {
  db = db(opts.mongoUrl)
  opts.eventsAndJobs[jobName] = jobName
  opts.eventsAndJobs[jobNameForSingleUser] = jobNameForSingleUser

  opts.agenda.define(jobName, function (job, done) {
    var data = job.attrs.data

    jobs.process(jobNameForUpdateFeed, data.topic, done)

    db.users.find({ 'notifications.new-topic': true }, function (err, users) {
      if (err) return done(err)

      async.each(users, function(u, cb) {
        jobs.process(jobNameForSingleUser,{
          topic: data.topic,
          url: data.url,
          to: { name: name.format(u), email: u.email }
        }, cb)
      }, done)
    })
  })

  opts.agenda.define(jobNameForSingleUser, function (job, done) {
    // email and user *will* exist because only a 'topic-public'
    // may trigger this job and that queary already scans the DB
    var data = job.attrs.data

    var params = {
      template: jobName,
      to: data.to,
      vars: [
        { name: 'TOPIC', content: data.topic.mediaTitle },
        { name: 'URL', content: data.url },
        { name: 'USER_NAME', content: data.to.name }
      ]
    }

    mail(params, done)
  })
}
