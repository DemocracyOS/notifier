var db = require('../../db')
var log = require('debug')('democracyos:notifier:forgot')

var jobName = 'topic-commented'

module.exports = function (opts) {
  db = db(opts.mongoUrl)
  opts.eventsAndJobs[jobName] = jobName

  opts.agenda.define(jobName, function (job, done) {
    var data = job.attrs.data


    db.feeds.findOne({ url: data.instance }, function (err, feed) {
      if (err) return log('Error found %s', err), done(err);

      feed = feed || {};
      feed.type = jobName;
      feed.createdAt = Date.now();
      feed.topic = data.topic;
      feed.comment = data.comment;
      feed.data = { user: data.user };

      db.feeds.save(feed, function (err, feed) {
        if (err) return log('Error found %s', err), done(err);

        log('Saved feed for commented topic %s', data.topic);
        if (done) done(null, feed);
      });
    });
  })
}
