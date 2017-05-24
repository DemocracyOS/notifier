var mongo = require('mongojs')
var config = require('../config')

var dbs = {}

module.exports = function connectToMongoDB (mongoUrl) {
  if (!mongoUrl) {
    mongoUrl = config.get('mongoUrl')
  }

  if (dbs[mongoUrl]) {
    return dbs[mongoUrl]
  }

  // connect to db
  dbs[mongoUrl] = mongo(mongoUrl, [
    'users',
    'topics',
    'tags',
    'feeds'
  ], {
    authMechanism: 'SCRAM-SHA-1'
  })

  if (!dbs[mongoUrl]) {
    throw new Error('could not connect to ' + config.connection)
  }

  return dbs[mongoUrl]
}
