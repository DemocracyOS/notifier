var defaults = require('defaults-deep')
var agenda = require('./lib/agenda')
var timing = require('./lib/utils/timing')
var jobs = require('./lib/jobs')
var transports = require('./lib/transports')

var log = require('debug')('democracyos:notifier')

var defaultOpts = {
  mongoUrl: 'mongodb://localhost/DemocracyOS-dev',
  collection: 'notifierJobs',
  organizationName: 'noreply@democracyos.org',
  organizationEmail: 'The DemocracyOS team',
  mailer: {
    service: '',
    auth: {
      user: '',
      pass: ''
    }
  }
}

var exports = module.exports = function startNotifier(opts, callback) {
  defaults(opts, defaultOpts)

  agenda = agenda({
    db: {
      address: opts.mongoUrl,
      collection: opts.collection
    }
  })

  transports = transports(opts)

  agenda.purge(function (err) {
    if (err) return callback && callback(err)

    //initialize job processors
    jobs(agenda, mongoUrl)

    agenda.on('start', function (job) {
      timing.start(job)
      log('Job \'%s\' started', job.attrs.name)
    })

    agenda.on('success', function (job) {
      var duration = timing.finish(job)
      log('Job \'%s\' completed - duration: %s', job.attrs.name, duration.asMilliseconds())
    })

    agenda.on('fail', function (err, job) {
      log('Job \'%s\' failed - reason: %s',job.attrs.name, err)
    })

    agenda.start()

    if (callback) return callback()
  })

  exports.notify = function notify(event, callback) {
    jobs.process(event.event, event, callback)
  }
}
