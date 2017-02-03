var db = require('../../db')
var mail = require('../../transports').mail
var log = require('debug')('democracyos:notifier:forgot')
var name = require('../../utils/name')

var jobName = 'welcome-email'

module.exports = function (opts) {
  db = db(opts.mongoUrl)
  opts.eventsAndJobs['signup'] = jobName
  opts.eventsAndJobs['resend-validation'] = jobName

  opts.agenda.define(jobName, function (job, done) {
    var data = job.attrs.data

    db.users.findOne({ email: data.to }, function (err, user) {
      if (err) return job.done(err)
      if (!user) return job.done(new Error(`user not found for email "${data.email}"`))

      var params = {
        template: job.attrs.name,
        to: {
          email: user.email,
          name: name.format(user)
        },
        lang: user.locale,
        vars: [
          { name: 'USER_NAME', content: user.firstName },
          { name: 'VALIDATE_MAIL_URL', content: data.validateUrl }
        ]
      }

      mail(params, done)
    })
  })
}
