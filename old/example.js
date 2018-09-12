/* eslint-disable no-process-exit */

const config = require('./lib/config')
const notifier = require('.')

config.set({
  mongoUrl: 'mongodb://localhost/DemocracyOS-dev'
})

notifier.start()
  .then(() => {
    console.log('Executing job welcome-email')

    return notifier.now('welcome-email', {
      to: 'matias@democracyos.org',
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
