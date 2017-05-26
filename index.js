var agenda = require('./lib/agenda')
var timing = require('./lib/utils/timing')
var jobs = require('./lib/jobs')
var transports = require('./lib/transports')
var config = require('./lib/config')

var log = require('debug')('democracyos:notifier')

var exports = module.exports = function startNotifier (opts, callback) {
  var inited = false

  config.set(opts)

  agenda = agenda({
    db: {
      address: config.get('mongoUrl'),
      collection: config.get('collection')
    }
  })

  transports()

  agenda.on('ready', () => {
    init((err) => {
      log('agenda initialized.')
      inited = true

      if (callback) {
        return callback(err)
      }
    })
  })

  agenda.on('error', (err) => {
    // throw the error to crash if the server is already started
    if (inited) throw err

    if (callback) {
      return callback(err)
    }
  })

  exports.notify = function notify (event, callback) {
    jobs.process(event.event, event, callback)
  }
}

function init (callback) {
  agenda.purge(function (err) {
    if (err) {
      if (callback) callback(err)
      return
    }

    // initialize job processors
    jobs.init(agenda)

    agenda.on('start', function (job) {
      timing.start(job)
      log('Job \'%s\' started', job.attrs.name)
    })

    agenda.on('success', function (job) {
      var duration = timing.finish(job)
      log('Job \'%s\' completed - duration: %s', job.attrs.name, duration.asMilliseconds())
    })

    agenda.on('fail', function (err, job) {
      log('Job \'%s\' failed - reason: %s', job.attrs.name, err)
    })

    agenda.start()

    if (callback) {
      return callback()
    }
  })
}
