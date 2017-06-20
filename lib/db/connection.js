const db = require('.')

module.exports = db.then(() => {
  return db._db
})
