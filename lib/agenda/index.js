const Agenda = require('agenda')
const connection = require('../db/connection')

module.exports = connection.then((conn) => {
  return new Promise((resolve, reject) => {
    const agenda = new Agenda({ mongo: conn })

    agenda.on('error', reject)
    agenda.on('ready', () => resolve(agenda))
  })
}).catch((err) => { throw err })
