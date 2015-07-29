var mandrill = require('node-mandrill')
var templates = require('../templates')
var t = require('../translations').t
var log = require('debug')('notifier:transports')

function setupMandrill(token) {
  if (!token || 'string' != typeof token) {
    throw new Error('Undefined or invalid mandrill API token')
  }

  log('Initializing mandrill with token "%s"', token)
  return mandrill(token)
}

function sendMandrill(opts, callback) {
  var to = resolveRecipient(opts.to)
  var from = opts.from || { email: 'noreply@democracyos.org', name: 'The DemocracyOS team' }

  // get mail body from jade template
  templates.jade(opts.event, opts.vars, function (err, body) {
    if (err) return callback(err);

    log('Sending email for "%s" event', opts.event)

    mandrill('/messages/send', {
      message: {
        to: to,
        from_email: from.email,
        from_name: from.name,
        subject: t('templates.' + opts.event + '.subject'),
        html: body
      }
    }, function (err, response) {
      if (err) log('Mandrill API error: %s', err)
      else log('Mandrill send successful: %s', response)

      if (callback) callback(err)
    })
  })
}

function resolveRecipient(obj) {
  if (Array.isArray(obj)) return obj
  if ('object' === typeof obj) return [obj]
  if ('string' === typeof obj) return { email: obj }

  throw new Error('Invalid or undefined recipient object')
}

/**
 * Module exports
 */
var exports = module.exports = function transports(config) {

  // setup mandrill
  mandrill = setupMandrill(config.mandrillToken)
  exports.mail = sendMandrill
}
