var defaults = require('defaults-deep')
var defaultConfig = require('./defaults.json')

var config = defaults({}, defaultConfig)

/**
 * Function to set new configuration values
 * @method set
 * @param  {Object} newConfig new values to set on config
 */
module.exports.set = function configSet (newConfig) {
  config = defaults({}, newConfig, defaultConfig)
}

/**
 * Get a configuration value
 * @method get
 * @param  {String} key dot notation key, e.g.: 'mailer.service'
 * @return {Mixed} current config value
 */
module.exports.get = function configGet (key) {
  if (typeof key !== 'string') throw new Error('"key" should be a string')

  return key.split('.').reduce(function (val, k) {
    return val[k]
  }, config)
}
