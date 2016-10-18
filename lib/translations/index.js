var fs = require('fs')
var path = require('path')
var defaults = require('defaults-deep')
var t = require('t-component')
var config = require('../config')

/**
 * Generate an Array with all the translated localizations
 */
var translated = fs.readdirSync(path.join(__dirname, 'lib')).map(function (p) {
  return p.replace('.json', '')
})

var defaultTranslations = require('./lib/en')

/**
 * Load localization dictionaries to translation application
 */
translated.forEach(function (locale) {
  var translation = require('./lib/' + locale)
  defaults(translation, defaultTranslations)
  t[locale] = translation
})

;(function overrideLang () {
  var original = t.lang

  function getLangCode (code) {
    if (!code) return config.get('defaultLocale')

    var isAvailable = config.get('availableLocales').indexOf(code) !== -1
    var isTranslated = translated.indexOf(code) !== -1

    if (isAvailable && isTranslated) {
      return code
    } else {
      return config.get('defaultLocale')
    }
  }

  t.lang = function lang (code) {
    code = getLangCode(code)
    original(code)
    return code
  }
})()

module.exports.t = t
