const mongojs = require('mongojs')
const connection = require('./connection')

module.exports = connection.then((conn) => {
  return mongojs(conn, [
    'comments',
    'forums',
    'tags',
    'topics',
    'users'
  ])
}).catch((err) => { throw err })
