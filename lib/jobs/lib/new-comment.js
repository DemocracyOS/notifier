const monk = require('monk')
const t = require('t-component')
const templates = require('../../templates')
const utils = require('../../utils')

const jobName = 'new-comment'
const jobNameForSingleUser = 'new-comment-single-recipient'

module.exports = function topicPublished (notifier) {
  const { db, agenda, mailer } = notifier
  const users = db.get('users')
  const comments = db.get('comments')
  const forums = db.get('forums')

  agenda.define(jobName, (job, done) => {
    const { topic, comment, url } = job.attrs.data
    forums.findOne({_id: topic.forum})
      .then((forum) => {
        const moderators = forum.permissions && forum.permissions
          .filter((p) => p.role === 'moderator')
          .map((r) => r.user)
        if (!moderators || moderators.length === 0) return

        return users.find({
          $and: [
            { _id: { $in: moderators } },
            { _id: { $ne: monk.id(comment.author.id) } }
          ]
        }).each((user, { pause, resume }) => {
          pause()

          agenda.now(jobNameForSingleUser, {
            topicTitle: topic.mediaTitle,
            comment,
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
      url,
      to,
      locale
    } = job.attrs.data

    const html = templates[jobName]({
      userName: to.name,
      topicTitle,
      comment,
      url
    }, {
      lang: locale
    })

    return mailer.send({
      to,
      subject: t(`templates.${jobName}.subject`, { topicTitle }),
      html
    }).then(() => { done() }).catch(done)
  })
}
