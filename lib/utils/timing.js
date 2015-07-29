/**
 * Module dependencies.
 */

var util = require('util')
var moment = require('moment')


var started = {}

var timing = {
  start: function start(job) {
    started[_identify(job)] = moment()
  },

  finish: function finish(job) {
    var finished = moment()
    var duration = moment.duration(finished.diff(started[_identify(job)]))

    return duration
  }
}

function _identify(job) {
  return util.format('%s_%s', job.attrs.name, job.attrs._id)
}

module.exports = timing