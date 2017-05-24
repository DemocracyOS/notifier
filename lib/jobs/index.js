var path = require('path')
var requireAll = require('require-all')

var agenda

module.exports.init = function init (_agenda) {
  agenda = _agenda

  // Load all jobs
  requireAll(path.join(__dirname, '/lib'))
}

module.exports.define = function define (name, job) {
  agenda.define(name, job)
}

module.exports.process = function process (eventName, data, cb) {
  return new Promise((resolve, reject) => {
    agenda.now(eventName, data, (err) => {
      if (err) {
        if (cb) cb(err)
        return reject(err)
      }

      if (cb) cb(cb)
      resolve()
    })
  })
}
