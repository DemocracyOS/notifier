var agenda = require('./lib/agenda')
var timing = require('./lib/utils/timing')
var jobs = require('./lib/jobs')
var transports = require('./lib/transports')
var config = require('./lib/config')

var log = require('debug')('democracyos:notifier')

var exports = module.exports = function startNotifier(opts, callback) {
  config.set(opts)

  agenda = agenda({
    db: {
      address: config.get('mongoUrl'),
      collection: config.get('collection')
    }
  })

  transports()

  setTimeout(function verifyInitialization(){
    if (!agenda._collection) {
      log('initializing agenda...')
      return setTimeout(verifyInitialization, 100)
    }
    log('agenda initialized.')
    init(callback)
  }, 100)

  exports.notify = function notify(event, callback) {
    jobs.process(event.event, event, callback)
  }
}

function init(callback){
  agenda.purge(function (err) {
    if (err) return callback && callback(err)

    // initialize job processors
    jobs(agenda, config.get('mongoUrl'))

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
    if (callback) return callback()
  })
}
