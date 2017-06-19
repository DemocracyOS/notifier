var path = require('path')
var requireAll = require('require-all')

module.exports.init = function init () {
  const jobs = requireAll(path.join(__dirname, '/lib'))
  return Promise.all(Object.keys(jobs).map((name) => jobs[name]))
}
