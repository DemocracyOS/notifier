var chai = require('chai')
var expect = chai.expect
chai.should()
var db = 'mongodb://localhost/notifier-test'

describe('notifier', function () {
  var notifier

  it('should be properly initialised with its default values', function (done) {
    var notifier = require('../')
    notifier({ mongoUrl: db }, function () {
      notifier.notify.should.be.a('function')
      done()
    })
  })
})

describe('jobs', function () {
  // TODO: write tests for jobs module
})

describe('templates', function () {
  // TODO: write tests for templates module
})

describe('utils', function () {
  // TODO: write tests for utils module
})

describe('translations', function () {
  // TODO: write tests for translations module
})

