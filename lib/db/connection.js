const MongoClient = require('mongodb').MongoClient
const Graceful = require('node-graceful')
const config = require('../config')

module.exports = new Promise((resolve, reject) => {
  const url = config.get('mongoUrl')

  MongoClient.connect(url, (err, conn) => {
    if (err) return reject(err)
    resolve(conn)

    Graceful.on('exit', () => conn.close())
  })
})
