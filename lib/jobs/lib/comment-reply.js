var db = require('../../db')
var mail = require('../../transports').mail
var log = require('debug')('democracyos:notifier:forgot')
var name = require('../../utils/name')
var ObjectId = require('mongojs').ObjectId

var jobName = 'comment-reply'

module.exports = function (opts) {
  db = db(opts.mongoUrl)
  opts.eventsAndJobs[jobName] = jobName

  opts.agenda.define(jobName, function (job, done) {
    var data = job.attrs.data

    // This should never happen, but just in case
    if (data.reply.author.id === data.comment.author.id) {
      return done(new Error(`Ignoring job ${jobName} - Reply author equals comment author`))
    }

    db.users.findOne({ _id: ObjectId(data.comment.author.id) }, function (err, commentAuthor) {
      if (err) return done(err)
      if (!commentAuthor) return done(new Error(`user not found for comment author with id "${data.comment.author.id}"`))

      // Don't notify author if they chose not to be notified
      if (commentAuthor.notifications && !commentAuthor.notifications.replies) {
        log('Ignoring job "%s" - Comment author notifications are off for this event', jobName)
        return done()
      }

      db.users.findOne({ _id: ObjectId(data.reply.author.id) }, function(err, replyAuthor) {
        if (err) return done(err)
        if (!replyAuthor) return done(new Error(`user not found for reply author with id "${data.reply.author.id}"`))

        var params = {
          template: job.attrs.name,
          //TODO: edit custom subject
          subject: 'some subject',
          to: {
            email: commentAuthor.email,
            name: name.format(commentAuthor)
          },
          lang: commentAuthor.locale,
          vars: [
            { name: 'USER_NAME', content: commentAuthor.firstName },
            { name: 'REPLY', content: data.reply.text },
            { name: 'URL', content: data.url }
          ]
        }

        mail(params, done)
      })
    })
  })
}
