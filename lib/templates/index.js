var fs = require('fs')
var path = require('path')
var jade = require('jade')
var t = require('../translations').t
var log = require('debug')('democracyos:notifier:templates')

function _jade(opts, vars, callback) {
  if ('string' === typeof opts) return _jade({ name: opts }, vars, callback)

  if (!opts.name) return callback(new Error('Undefined template name'))

  var name = opts.name
  var lang = t.hasOwnProperty(opts.lang) ? opts.lang : 'en'

  var filePath = path.join(__dirname, './lib/' + name + '.jade')

  log('looking for mail template [' + name + '] in path: ' + filePath)

  fs.readFile(filePath, { encoding: 'utf-8' }, function (err, template) {
    if (err) return callback(err)

    var mail = jade.compile(template)

    t.lang(lang)
    var content = replaceVars(mail({ t: t }), vars)

    callback(null, content)
  })
}

function replaceVars(template, vars) {
  if (!vars) return template

  var res = template

  if (res) {
    vars.forEach(function (v) {
      res = res.replace(v.name, v.content)
    })
  }

  return res
}


module.exports = {
  jade: _jade
}