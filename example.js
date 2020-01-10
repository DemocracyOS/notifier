/* eslint-disable no-process-exit */

const config = require('./lib/config')
const notifier = require('.')

config.set({
  "mongoUrl": 'mongodb://localhost/DemocracyOS-dev',
  "defaultLocale": "es",
  "mailer": {
    "service": "gmail", // can be other provider
    "auth": {
      "user": "my-send-email@gmail.com",
      "pass": "dont-commit-me!"
    }
  }
})

notifier.start()
  .then(() => {
    console.log('Executing job welcome-email')

    return notifier.now('welcome-email', {
      to: 'test-to-mail@whatever.com',
      validateUrl: 'https://app.democracyos.org'
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      notifier.agenda.once('success:welcome-email', (job) => {
        resolve(job)
      })

      notifier.agenda.once('fail:welcome-email', (err, job) => {
        reject(err)
      })
    })
  })
  .then((job) => {
    console.log('User notified!', job.attrs)
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error!', err)
    process.exit(1)
  })
