var fs = require('fs')
var defaults = require('defaults-deep')
var t = require('t-component')

/**
 * Generate an Array with all the available localizations
 */
var available = fs.readdirSync('./lib').map(function (p) {
  return p.replace('.json', '')
})

var defaultTranslations = require('./lib/en')

/**
 * Load localization dictionaries to translation application
 */
available.forEach(function (locale) {
  var translation = require('./lib/' + locale)
  defaults(translation, defaultTranslations)
  t[locale] = translation
})

module.exports.t = t
