const db = require('.')

module.exports = db.then((db) => {
  return db._db
}).catch((err) => { throw err })
