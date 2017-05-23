var mongo = require('mongojs')

var dbs = {}

module.exports = function connectToMongoDB (mongoUrl) {
  if (!mongoUrl || 'string' != typeof mongoUrl) {
    throw new Error('Invalid MongoDB connection string')
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

  if (!dbs[mongoUrl]){
    throw new Error('could not connect to ' + config.connection)
  }

  return dbs[mongoUrl]
}
