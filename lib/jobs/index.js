var path = require('path')
var requireAll = require('require-all')

module.exports.init = function init (notifier) {
  const jobs = requireAll({
    dirname: path.join(__dirname, '/lib'),
    resolve: (job) => typeof job === 'function' && job(notifier)
  })

  return Promise.all(Object.keys(jobs).map((name) => jobs[name]))
}
