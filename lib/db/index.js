const monk = require('monk')
const Graceful = require('node-graceful')
const listenOnceOf = require('../utils/listen-once-of')
const config = require('../config')

module.exports = monk(config.get('mongoUrl')).then((db) => {
  db.catch = db.then = new Promise((resolve, reject) => {
    switch (db._state) {
      case 'closed':
        reject(new Error('Connection closed'))
        break
      case 'open':
        resolve(db)
        break
      default:
        listenOnceOf(db, {
          open: resolve,
          'error-opening': reject
        })
    }
  })

  Graceful.on('exit', (done) => db.close(done))

  return db
}).catch((err) => { throw err })
