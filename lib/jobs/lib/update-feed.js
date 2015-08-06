var db = require('../../db')
var log = require('debug')('democracyos:notifier:topic-published-update-feed')
var ObjectId = require('mongojs').ObjectId

var jobName = 'update-feed'

module.exports = function updateFeed(opts) {
  db = db(opts.mongoUrl)
  opts.eventsAndJobs[jobName] = jobName

  opts.agenda.define(jobName, function (job, done) {
    var data = job.attrs.data

    db.topics.findOne({_id: ObjectId(data.id)}, function (err, topic) {
      if (err) return log('Error found %s', err), done(err)

      db.feeds.findOne({ forum: ObjectId(topic.forum) }, function (err, feed) {
        if (err) return log('Error found %s', err), done(err)

        feed = feed || {}
        feed.type = 'topic-published'
        feed.topic = data.id
        feed.createdAt = Date.now()
        feed.forum = topic.forum

        db.feeds.save(feed, function (err, feed) {
          if (err) return log('Error found %s', err), done(err)

          log('Saved feed for published topic %s', feed.topic)
          done()
        })
      })
    })
  })
}

module.exports.jobName = jobName
