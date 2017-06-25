const pify = require('pify')
const config = require('../config')
const transporter = require('./transporter')

const sendMail = pify(transporter.sendMail.bind(transporter))

const defaultSender = {
  name: config.get('organizationName'),
  address: config.get('organizationEmail')
}

module.exports.send = function send (opts) {
  if (!opts.from) opts.from = defaultSender
  return sendMail(opts)
}
