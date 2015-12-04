var assert = require("assert");
var cp = require("child_process");

describe("npmc", function() {
  /**
   * TODO: Really bad test, write better ones
   */
  it("really need some tests", function(done) {
    this.timeout(60000);
    cp.exec(__dirname+"/../cli.js "+__dirname+"/../node_modules/got/package.json", function(err, _stdout, _strerr) {
      assert.ifError(err);
      done();
    })
  });
});
