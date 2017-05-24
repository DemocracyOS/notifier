var db = require('../../db')
var mail = require('../../transports').mail
var name = require('../../utils/name')
var jobs = require('../../jobs')

var jobName = 'forgot-password'

jobs.define(jobName, function (job, done) {
  var data = job.attrs.data

  db().users.findOne({ email: data.to }, function (err, user) {
    if (err) return done(err)

    if (!user) {
      return done(new Error(`user not found for email "${data.email}"`))
    }

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
