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
    const { topicTitle, comment, reply, url } = job.attrs.data
    const replyAuthor = String(reply.author.id)

    comments.findOne({ _id: monk.id(comment.id) }, 'replies')
      .then((commentReplies) => {
        const { replies } = commentReplies
        const commentAuthor = String(comment.author.id)
        const usersToNotify = []

        if (commentAuthor !== replyAuthor) usersToNotify.push(commentAuthor)

        // Notify thread participants
        replies.forEach((rep) => {
          const author = String(rep.author)

          // Dont notify the author of the reply
          if (author === replyAuthor) return

          usersToNotify.push(commentAuthor)
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

function uniq (arr) {
  return Array.from(new Set(arr))
}
