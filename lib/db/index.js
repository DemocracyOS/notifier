var mongo = require('mongojs')

module.exports = function connectToMongoDB (mongoUrl) {
  if (!mongoUrl || 'string' != typeof mongoUrl) {
    throw new Error('Invalid MongoDB connection string')
  }

  // connect to db
  var db = mongo(mongoUrl, ['users', 'topics', 'tags', 'feeds'], {authMechanism: 'SCRAM-SHA-1'})

  if (!db) throw new Error('could not connect to ' + config.connection)

  return db
}
