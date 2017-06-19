const mongojs = require('mongojs')
const connection = require('./connection')

module.exports = connection.then((conn) => {
  return new Promise((resolve, reject) => {
    const db = mongojs(conn, [
      'comments',
      'forums',
      'tags',
      'topics',
      'users'
    ])

    db.on('error', reject)
    db.on('connect', () => resolve(db))
  })
}).catch((err) => { throw err })
