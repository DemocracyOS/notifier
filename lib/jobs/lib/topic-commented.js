var db = require('../../db')
var log = require('debug')('democracyos:notifier:topic-commented')
var ObjectId = require('mongojs').ObjectId
var jobs = require('../../jobs')

var jobName = 'topic-commented'

jobs.define(jobName, function (job, done) {
  var data = job.attrs.data

  db().topics.findOne({ _id: ObjectId(data.topic) }, function (err, topic) {
    if (err) {
      log('Error found %s', err)
      return done(err)
    }

    db().feeds.findOne({ forum: ObjectId(topic.forum) }, function (err, feed) {
      if (err) {
        log('Error found %s', err)
        return done(err)
      }

      feed = feed || {}
      feed.type = jobName
      feed.createdAt = Date.now()
      feed.topic = data.topic
      feed.comment = data.comment
      feed.data = { user: data.user }
      feed.forum = topic.forum

      db().feeds.save(feed, function (err, feed) {
        if (err) {
          log('Error found %s', err)
          return done(err)
        }

        log('Saved feed for commented topic %s', data.topic)
        done()
      })
    })
  })
})
