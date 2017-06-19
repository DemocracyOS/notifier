var path = require('path')
var requireAll = require('require-all')

module.exports = requireAll(path.join(__dirname, '/lib'))
