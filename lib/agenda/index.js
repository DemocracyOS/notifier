const Agenda = require('agenda')
const Graceful = require('node-graceful')
const config = require('../config')
const connection = require('../db/connection')

module.exports = connection.then((db) => {
  return new Promise((resolve, reject) => {
    const agenda = new Agenda({
      mongo: db,
      db: { collection: config.get('collection') }
    })

    agenda.on('error', reject)
    agenda.on('ready', () => resolve(agenda))

    Graceful.on('exit', (done) => agenda.stop(done))
  })
}).catch((err) => { throw err })
