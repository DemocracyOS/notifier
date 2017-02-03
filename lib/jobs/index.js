var requireAll = require('require-all')
var eventsAndJobs = {}

var exports = module.exports = function initializeJobs(agenda, mongoUrl) {
  requireAll({
    dirname: __dirname + '/lib',
    resolve: function initEvent(job) {
      job({
        agenda: agenda,
        mongoUrl: mongoUrl,
        eventsAndJobs: eventsAndJobs
      })
    }
  })

  exports.process = function process(eventName, data, callback) {
    var err = null
    var jobName = eventsAndJobs[eventName]

    if (jobName) {
      // TODO: make agenda scheduling depend on jobs instead of always using `now`
      agenda.now(jobName, data)
    } else {
      err = new Error(`No job defined for event "${eventName}"`)
    }

    if (callback) callback(err)
  }
}
