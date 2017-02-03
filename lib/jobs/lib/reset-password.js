var db = require('../../db')
var mail = require('../../transports').mail
var log = require('debug')('democracyos:notifier:forgot')
var name = require('../../utils/name')

var jobName = 'reset-password'

module.exports = function (opts) {
  db = db(opts.mongoUrl)
  opts.eventsAndJobs['forgot-password'] = jobName

  opts.agenda.define(jobName, function (job, done) {
    var data = job.attrs.data

    db.users.findOne({ email: data.to }, function (err, user) {
      if (err) return done(err)
      if (!user) return done(new Error(`user not found for email "${data.email}"`))

      var params = {
        template: job.attrs.name,
        to: {
          email: user.email,
          name: name.format(user)
        },
        lang: user.locale,
        vars: [
          { name: 'USER_NAME', content: user.firstName },
          { name: 'RESET_PASSWORD_URL', content: data.resetUrl }
        ]
      }

      mail(params, done)
    })
  })
}
