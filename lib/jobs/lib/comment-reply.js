const monk = require('monk')
const t = require('t-component')
const templates = require('../../templates')
const utils = require('../../utils')

const jobName = 'comment-reply'
const jobNameForSingleUser = 'comment-reply-single-recipient'

module.exports = function topicPublished (notifier) {
  const { db, agenda, mailer } = notifier
  const users = db.get('users')
  const comments = db.get('comments')

  agenda.define(jobName, (job, done) => {
    const { topic, comment, reply, url } = job.attrs.data

    comments.distinct('replies.author', {
      _id: monk.id(comment.id)
    }).then((usersToNotify) => {
      usersToNotify.push(monk.id(comment.author.id))

      return users.find({
        $and: [
          {
            _id: { $in: usersToNotify },
            'notifications.replies': true
          },
          { _id: { $ne: monk.id(reply.author.id) } }
        ]
      }).each((user, { pause, resume }) => {
        pause()

        agenda.now(jobNameForSingleUser, {
          topicTitle: topic.mediaTitle,
          comment,
          reply,
          url,
          to: utils.emailAddress(user),
          locale: user.locale
        }, (err) => {
          if (err) return done(err)
          resume()
        })
      })
    }).then(() => { done() }).catch(done)
  })

  agenda.define(jobNameForSingleUser, (job, done) => {
    const {
      topicTitle,
      comment,
      reply,
      url,
      to,
      locale
    } = job.attrs.data

    const html = templates[jobName]({
      userName: to.name,
      topicTitle,
      comment,
      reply,
      url
    }, {
      lang: locale
    })

    return mailer.send({
      to,
      subject: t(`templates.${jobName}.subject`),
      html
    }).then(() => { done() }).catch(done)
  })
}
