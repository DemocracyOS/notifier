var db = require('../../db')
var jobs = require('../../jobs')

var log = require('debug')('democracyos:notifier:topic-voted')
var ObjectId = require('mongojs').ObjectId

var jobName = 'topic-voted'

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
      feed.forum = topic.forum
      feed.data = { user: data.user, vote: data.vote }

      db().feeds.save(feed, function (err, feed) {
        if (err) {
          log('Error found %s', err)
          return done(err)
        }

        log('Saved feed for published topic %s', data.topic)
        done()
      })
    })
  })
})
