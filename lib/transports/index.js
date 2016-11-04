var nodemailer = require('nodemailer')
var config = require('../config')
var templates = require('../templates')
var t = require('../translations').t
var log = require('debug')('democracyos:notifier:transports')

function createTransport() {
  log('Initializing nodemailer API client')

  var opts = config.get('mailer.service') ?
    config.get('mailer') :
    config.get('nodemailer')

  // Use directTransport when nothing is configured
  if (opts && Object.keys(opts).length === 0) {
    opts = undefined
  }

  return nodemailer.createTransport(opts)
}

function sendMail(transport, opts, callback) {
  var to = resolveRecipient(opts.to)
  var from = resolveRecipient(opts.from || {
    email: 'noreply@democracyos.org',
    name: 'The DemocracyOS team'
  })

  var lang = t.lang(opts.lang)

  // get mail body from pug template
  templates.pug({
    name: opts.template,
    lang: lang
  }, opts.vars, function (err, body) {
    if (err) return callback(err)

    log('Sending email for "%s" job', opts.template)

    t.lang(lang)

    transport.sendMail({
      from: from,
      to: to,
      subject: t('templates.' + opts.template + '.subject'),
      html: body
    }, function (err, response) {
      if (err) log('Nodemailer API error: %j', err)
      else log('Nodemailer send successful: %j', response)

      if (callback) callback(err)
    })
  })
}

function resolveRecipient(rec) {
  if ('string' === typeof rec) return rec

  if ('object' === typeof rec) {
    if (rec.name) return rec.name + ' <' + rec.email + '>'
    return rec.email
  }

  if (Array.isArray(rec)) return rec.map(resolveRecipient)

  throw new Error('Invalid or undefined recipient object')
}

/**
 * Module exports
 */
var exports = module.exports = function transports() {
  var transport = createTransport()

  exports.mail = function (opts, callback){
    if (!opts.from &&
      config.get('organizationName') &&
      config.get('organizationEmail')) {

      opts.from = {
        email: config.get('organizationEmail'),
        name: config.get('organizationName')
      }
    }
    sendMail(transport, opts, callback)
  }
}
