var fs = require('fs')
var path = require('path')
var defaults = require('defaults-deep')
var t = require('t-component')

/**
 * Generate an Array with all the available localizations
 */
var available = fs.readdirSync(path.join(__dirname, 'lib')).map(function (p) {
  return p.replace('.json', '')
})
console.log('=======================')
console.log(available)
console.log('=======================')

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
