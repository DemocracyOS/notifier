const config = require('./lib/config')
const notifier = require('.')

config.set({
  'mongoUrl': 'mongodb://localhost/DemocracyOS-dev-singleForum'
})

notifier.start()
  .then(() => {
    notifier.agenda.now('welcome-email', {
      to: 'matias@democracyos.org',
      validateUrl: 'https://app.democracyos.org'
    }, () => {
      console.log('User notified!')
      process.exit(0)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
