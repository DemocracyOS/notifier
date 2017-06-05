const config = require('../config')
const transporter = require('./transporter')

module.exports.send = function send (opts) {
  return new Promise((resolve, reject) => {
    if (!opts.from) {
      opts.from = {
        name: config.get('organizationName'),
        address: config.get('organizationEmail')
      }
    }

    transporter.sendMail(opts, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
