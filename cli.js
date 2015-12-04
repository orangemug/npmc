#!/usr/bin/env node
var yargs       = require("yargs");
var chalk       = require("chalk");
var browserify  = require("browserify");
var UglifyJS    = require("uglify-js");
var fs          = require("fs");
var collect     = require("stream-collect");
var async       = require("async");
var prettyBytes = require("pretty-bytes");
var path        = require("path");
var pkg         = require("./package");


var argv = yargs
  .usage(pkg.description+"\nUsage: $0")
  .version(function() {
    return pkg.version;
  })
  .demand(1)
  .help("help")
  .alias("h", "help")
  .argv;


run(
  path.resolve(process.cwd(), argv._[0])
);


function run(filepath) {
  var dirname  = path.dirname(filepath);

  try {
    var raw = fs.readFileSync(filepath).toString()
  } catch(err) {
    console.error("Failed to read: %s", filepath);
    process.exit(3);
  }

  function stats(data) {
    return {
      chars: data.length,
      lines: data.split("\n").length,
      bytes: prettyBytes(
        Buffer.byteLength(data, "utf8")
      )
    };
  }

  function statsGroup(js) {
    return {
      minify: stats(
        UglifyJS.minify(js, {fromString: true}).code
      ),
      full: stats(js)
    }
  }

  var pkg = JSON.parse(raw);
  var dependencies = Object.keys(pkg.dependencies || {});
  var out = {};

  async.eachLimit(dependencies, 50, function iterator(moduleName, done) {
    var b = browserify();
    b.add(dirname+"/node_modules/"+moduleName);

    out[moduleName] = {
      version: pkg.dependencies[moduleName]
    };
    var err;

    console.log(chalk.gray("[processing]")+" %s", moduleName);

    b
      .bundle()
      .pipe(collect.stream())
      .on("error", function(_err) {
        if(!err) {
          console.log(chalk.green("[processed]")+"  %s", moduleName);
          out[moduleName].err = _err;
          done();
        }
        err = _err;
      })
      .on("collect", function(data) {
        // out[moduleName].data = data;
        out[moduleName].stats = statsGroup(data.toString());
        console.log(chalk.green("[processed]")+"  %s", moduleName);
        done();
      })

  }, function(err) {
    console.log("");
    Object.keys(out).forEach(function(moduleName) {
      var m = out[moduleName];
      console.log("%s (%s)",
        chalk.gray(moduleName),
        chalk.green(m.version)
      );
      if(m.err) {
        console.log("  ERR");
      } else {
        statsString(m.stats);
      }
      console.log("");
    });
  });

  function statsString(stats) {
    ["full", "minify"].forEach(function(k) {
      var m = stats[k];
      console.log("  %s: %s, %s lines, %s chars", k, m.bytes, m.lines, m.chars);
    });
  }
}
