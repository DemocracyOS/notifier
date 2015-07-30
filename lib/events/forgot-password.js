var db = require('../db')
var mail = require('../transports').mail
var log = require('debug')('democracyos:notifier:forgot')

module.exports = function (opts) {
  db = db(opts.mongoUrl)

  opts.agenda.define('forgot-password', function (job, done) {
    var data = job.attrs.data

    log('Executing job "%s" with data %s', job.attrs.name, JSON.stringify(data))

    db.users.findOne({ email: data.to }, function (err, user) {
      if (err) return job.fail(err)
      if (!user) return job.fail(new Error('user not found for email \'%s\'', data.email))

      params = {
        event: job.attrs.name,
        to: {
          email: user.email,
          user: formatName(user)
        },
        vars: [
          {name: 'USER_NAME', content: user.firstName},
          {name: 'RESET_PASSWORD_URL', content: data.resetUrl}
        ]
      }

      mail(params, done)
    })
  })
}

function formatName (user) {
  return user.lastName ? user.firstName + ' ' + user.lastName : user.firstName
}
