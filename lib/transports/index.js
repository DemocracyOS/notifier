var nodemailer = require('nodemailer')
var templates = require('../templates')
var t = require('../translations').t
var log = require('debug')('democracyos:notifier:transports')

function createTransport(config) {
  log('Initializing nodemailer API client')
  var opts = config && config.service ? config : undefined
  return nodemailer.createTransport(opts)
}

function sendMail(transport, opts, callback) {
  var to = resolveRecipient(opts.to)
  var from = resolveRecipient(opts.from || {
    email: 'noreply@democracyos.org',
    name: 'The DemocracyOS team'
  })

  // get mail body from jade template
  templates.jade(opts.template, opts.vars, function (err, body) {
    if (err) return callback(err)

    log('Sending email for "%s" job', opts.template)

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
var exports = module.exports = function transports(config) {
  var transport = createTransport(config)

  exports.mail = function (opts, callback){
    sendMail(transport, opts, callback)
  }
}
