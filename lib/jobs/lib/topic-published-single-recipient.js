const t = require('t-component')
const templates = require('../../templates')
const mailer = require('../../mailer')

const jobName = 'topic-published-single-recipient'
const template = templates['topic-published']

module.exports = function welcomeEmail (notifier) {
  const { agenda } = notifier

  agenda.define(jobName, (job, done) => {
    const { to, topic, url, locale } = job.attrs.data

    const html = template({
      userName: to.name,
      topic: topic.mediaTitle,
      url
    }, {
      lang: locale
    })

    return mailer.send({
      to,
      subject: t(`templates.topic-published.subject`),
      html
    }).then(() => { done() }).catch(done)
  })
}
