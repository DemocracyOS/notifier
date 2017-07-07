const monk = require('monk')
const t = require('t-component')
const templates = require('../../templates')
const mailer = require('../../mailer')
const utils = require('../../utils')

const jobName = 'comment-reply'
const jobNameForSingleUser = 'comment-reply-single-recipient'
const template = templates[jobName]

module.exports = function topicPublished (notifier) {
  const { db, agenda } = notifier
  const users = db.get('users')
  const comments = db.get('comments')

  agenda.define(jobName, (job, done) => {
    const { topicTitle, comment, reply, url } = job.attrs.data
    const replyAuthor = String(reply.author.id)

    comments.findOne({ _id: monk.id(comment.id) }, 'replies')
      .then((commentReplies) => {
        const { replies } = commentReplies
        const usersToNotify = []

        if (String(comment.author.id) !== replyAuthor) {
          usersToNotify.push(monk.id(comment.author.id))
        }

        replies.forEach((rep) => {
          const author = String(rep.author)

          // Dont notify the author of the reply
          if (author === replyAuthor) return

          // Notify only once
          if (usersToNotify.some((userId) => String(userId) === author)) return

          usersToNotify.push(monk.id(author))
        })

        return users.find({
          _id: { $in: usersToNotify },
          'notifications.replies': true
        })
          .each((user, { pause, resume }) => {
            pause()

            agenda.now(jobNameForSingleUser, {
              topicTitle,
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
      })
      .then(() => { done() })
      .catch(done)
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

    const html = template({
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
