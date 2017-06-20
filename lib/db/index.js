const monk = require('monk')
const Graceful = require('node-graceful')
const config = require('../config')

const db = module.exports = monk(config.get('mongoUrl'))

Graceful.on('exit', () => db.close())
