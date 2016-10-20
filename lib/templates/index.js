var fs = require('fs')
var path = require('path')
var pug = require('pug')
var t = require('../translations').t
var log = require('debug')('democracyos:notifier:templates')

function _pug(opts, vars, callback) {
  if ('string' === typeof opts) return _pug({ name: opts }, vars, callback)

  if (!opts.name) return callback(new Error('Undefined template name'))

  var name = opts.name
  var lang = opts.lang

  var filePath = path.join(__dirname, './lib/' + name + '.pug')

  log('looking for mail template [' + name + '] in path: ' + filePath)

  fs.readFile(filePath, { encoding: 'utf-8' }, function (err, template) {
    if (err) return callback(err)

    var mail = pug.compile(template)

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
  pug: _pug
}
