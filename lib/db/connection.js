const MongoClient = require('mongodb').MongoClient
const config = require('../config')

module.exports = new Promise((resolve, reject) => {
  const url = config.get('mongoUrl')

  MongoClient.connect(url, (err, db) => {
    if (err) return reject(err)
    resolve(db)
  })
})
