const Agenda = require('agenda')
const connection = require('../db/connection')

module.exports = connection.then((conn) => {
  return new Promise((resolve, reject) => {
    const agenda = new Agenda({ mongo: conn })

    agenda.on('ready', () => {
      resolve(agenda)
    })

    agenda.on('error', (err) => {
      reject(err)
    })
  })
}).catch((err) => { throw err })
