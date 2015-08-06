var db = require('../../db')
var log = require('debug')('democracyos:notifier:topic-voted')
var ObjectId = require('mongojs').ObjectId

var jobName = 'topic-voted'

module.exports = function (opts) {
  db = db(opts.mongoUrl)
  opts.eventsAndJobs[jobName] = jobName

  opts.agenda.define(jobName, function (job, done) {
    var data = job.attrs.data

    db.topics.findOne({_id: ObjectId(data.topic)}, function (err, topic) {
      if (err) return log('Error found %s', err), done(err);

      db.feeds.findOne({ forum: ObjectId(topic.forum) }, function (err, feed) {
        if (err) return log('Error found %s', err), done(err);

        feed = feed || {};
        feed.type = jobName;
        feed.createdAt = Date.now();
        feed.topic = data.topic;
        feed.forum = topic.forum;
        feed.data = { user: data.user, vote: data.vote };

        db.feeds.save(feed, function (err, feed) {
          if (err) return log('Error found %s', err), done(err);

          log('Saved feed for published topic %s', data.topic);
          done();
        });
      });

    });
  })
}
