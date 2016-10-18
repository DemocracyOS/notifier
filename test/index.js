var chai = require('chai');
var expect = chai.expect;
chai.should();
var db = 'mongodb://localhost/notifier-test';

describe('notifier', function () {
  it('should be properly initialised with its default values', function (done) {
    var notifier = require('../');
    notifier({ mongoUrl: db }, function () {
      expect(notifier.notify).to.be.a('function');
      done();
    })
  })
});

describe('jobs', function () {
  // TODO: write tests for jobs module
});

describe('templates', function () {
  // TODO: write tests for templates module
});

describe('utils', function () {
  describe(".name.format()", function() {
    it("should generate full name based on presence of firstName and lastName props", function() {
      var name = require("../lib/utils/name").format;

      expect(name({firstName: "bob"})).to.eql("bob");
      expect(name({firstName: "bob", lastName: "builder"})).to.eql("bob builder");
    })

    // unsure if checks are made elsewhere
    /*
     it("should throw exception on invalid input", function() {
       expect(function() {
       name({last_name: "builder"});
       }).to.throw(Error);
     })
     */
  })

  describe(".timing", function() {
    var timing = require("../lib/utils/timing");

    it("should return the duration of an operation", function(done) {
      var job = {
        attrs: {
          name: "job1",
          _id: 1234
        }
      };

      timing.start(job);

      setTimeout(function() {
        // added a generous 5ms padding to cover processing time
        // should always be above 500ms
        expect(timing.finish(job)._milliseconds).to.be.within(500,1500);
        done();
      }, 500);
    })
  })
});

describe('translations', function () {
  var t = require("../lib/translations").t;
  t.test = {
    "templates.email.greeting": "Hi, {USER_NAME},",
    "templates.email.signature": "The DemocracyOS team."
  };

  t.test2 = {
    "templates.email.greeting": "Bonjour, {USER_NAME},",
    "templates.email.signature": "L'équipe de DemocracyOS."
  };

  it("should return linguistic version of prop", function() {
    expect(t("templates.email.signature", "test")).to.eql("The DemocracyOS team.");
    expect(t("templates.email.signature", "test2")).to.eql("L'équipe de DemocracyOS.");
  });

  it("should return placeholders as-is if no props match", function(){
    expect(t("templates.email.greeting", "test")).to.eql("Hi, {USER_NAME},");
    expect(t("templates.email.greeting", "test2")).to.eql("Bonjour, {USER_NAME},");

    expect(t("templates.email.greeting", {user: "bobby"}, "test")).to.eql("Hi, {USER_NAME},");
    expect(t("templates.email.greeting", {user: "bobby"}, "test2")).to.eql("Bonjour, {USER_NAME},");
  })

  it("should swap placeholders with prop values", function() {
    expect(t("templates.email.greeting", {USER_NAME: "Bob the builder"}, "test")).to.eql("Hi, Bob the builder,");
    expect(t("templates.email.greeting", {USER_NAME: "Bob the builder"}, "test2")).to.eql("Bonjour, Bob the builder,");
  })
});
