
  // instrument by jscoverage, do not modifly this file
  (function(file, lines, conds, source) {
      var BASE;
      if (typeof global === "object") {
          BASE = global;
      } else if (typeof window === "object") {
          BASE = window;
      } else {
          throw new Error("[jscoverage] unknow ENV!");
      }
      if (BASE._$jscoverage) {
          BASE._$jscmd(file, "init", lines, conds, source);
          return;
      }
      var cov = {};
      /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
      function jscmd(file, type, line, express, start, offset) {
          var storage;
          switch (type) {
            case "init":
              if (cov[file]) {
                  storage = cov[file];
              } else {
                  storage = [];
                  for (var i = 0; i < line.length; i++) {
                      storage[line[i]] = 0;
                  }
                  var condition = express;
                  var source = start;
                  storage.condition = condition;
                  storage.source = source;
              }
              cov[file] = storage;
              break;

            case "line":
              storage = cov[file];
              storage[line]++;
              break;

            case "cond":
              storage = cov[file];
              storage.condition[line]++;
              return express;
          }
      }
      BASE._$jscoverage = cov;
      BASE._$jscmd = jscmd;
      jscmd(file, "init", lines, conds, source);
  })("tests/router.js", [1,2,3,4,5,8,9,10,11,12,28,42,15,19,16,21,22,23,24,29,33,30,35,36,37,38,43,47,44,50,51,52,53], {"12_5_26":0,"12_32_70":0,"28_5_36":0,"28_42_78":0,"30_10_35":0,"30_19_26":0,"42_5_32":0,"42_38_125":0,"44_10_31":0,"44_29_12":0}, ["require('../');","require('colors');","require('sugar');","var assert = require('assert');","var request = require('request');","","","describe('Test: App Router', function(){","\tvar app = new App({debug: false});","\tapp.domain('http://localhost:9000/');","\tapp.start(function(){\t\t","\t\tit('app.get(\\'/\\', ..)'.white+' - should listen and receive \"Hello World!\" upon visiting GET /'.grey","\t\t, function(done){","\t\t\t","\t\t\tapp.get('/', function($){","\t\t\t\t$.end('Hello World!');","\t\t\t});","\t\t\t","\t\t\trequest.get('http://localhost:9000/', function(error, response, body){","\t\t\t\tif(error) throw error;","\t\t\t\tassert.equal(response.headers['content-type'], 'text/plain');","\t\t\t\tassert.equal(response.statusCode, 200);","\t\t\t\tassert.equal(body, 'Hello World!');","\t\t\t\tdone();","\t\t\t});","\t\t});","\t\t","\t\tit('app.get(\\'/user/:name\\', ..)'.white+' - should listen and receive \"Hello John!\" upon visiting GET /user/john'.grey, function(done){","\t\t\tapp.get('/user/:name', function($){","\t\t\t\t$.end('Hello '+$.params.name.capitalize()+'!');","\t\t\t});","\t\t\t","\t\t\trequest.get('http://localhost:9000/user/john', function(error, response, body){","\t\t\t\tif(error) throw error;","\t\t\t\tassert.equal(response.headers['content-type'], 'text/plain');","\t\t\t\tassert.equal(response.statusCode, 200);","\t\t\t\tassert.equal(body, 'Hello John!');","\t\t\t\tdone();","\t\t\t});","\t\t});","\t\t","\t\tit('app.post(\\'/email\\', ..)'.white+' -should listen and receive \"Your Email is email@test.com!\" upon requesting POST /email with body email=email@test.com'.grey, function(done){","\t\t\tapp.post('/email', function($){","\t\t\t\t$.end('Your Email is ' + $.body.email + '!');","\t\t\t});","\t\t\t","\t\t\trequest.post('http://localhost:9000/email', {form:{email:'email@test.com'}}","\t\t\t, function(error, response, body){","\t\t\t\tif(error) throw error;","\t\t\t\tassert.equal(response.headers['content-type'], 'text/plain');","\t\t\t\tassert.equal(response.statusCode, 200);","\t\t\t\tassert.equal(body, 'Your Email is email@test.com!');","\t\t\t\tdone();","\t\t\t});","\t\t});","\t});","});"]);
_$jscmd("tests/router.js", "line", 1);

require("../");

_$jscmd("tests/router.js", "line", 2);

require("colors");

_$jscmd("tests/router.js", "line", 3);

require("sugar");

_$jscmd("tests/router.js", "line", 4);

var assert = require("assert");

_$jscmd("tests/router.js", "line", 5);

var request = require("request");

_$jscmd("tests/router.js", "line", 8);

describe("Test: App Router", function() {
    _$jscmd("tests/router.js", "line", 9);
    var app = new App({
        debug: false
    });
    _$jscmd("tests/router.js", "line", 10);
    app.domain("http://localhost:9000/");
    _$jscmd("tests/router.js", "line", 11);
    app.start(function() {
        _$jscmd("tests/router.js", "line", 12);
        it(_$jscmd("tests/router.js", "cond", "12_5_26", "app.get('/', ..)".white) + _$jscmd("tests/router.js", "cond", "12_32_70", ' - should listen and receive "Hello World!" upon visiting GET /'.grey), function(done) {
            _$jscmd("tests/router.js", "line", 15);
            app.get("/", function($) {
                _$jscmd("tests/router.js", "line", 16);
                $.end("Hello World!");
            });
            _$jscmd("tests/router.js", "line", 19);
            request.get("http://localhost:9000/", function(error, response, body) {
                if (error) throw error;
                _$jscmd("tests/router.js", "line", 21);
                assert.equal(response.headers["content-type"], "text/plain");
                _$jscmd("tests/router.js", "line", 22);
                assert.equal(response.statusCode, 200);
                _$jscmd("tests/router.js", "line", 23);
                assert.equal(body, "Hello World!");
                _$jscmd("tests/router.js", "line", 24);
                done();
            });
        });
        _$jscmd("tests/router.js", "line", 28);
        it(_$jscmd("tests/router.js", "cond", "28_5_36", "app.get('/user/:name', ..)".white) + _$jscmd("tests/router.js", "cond", "28_42_78", ' - should listen and receive "Hello John!" upon visiting GET /user/john'.grey), function(done) {
            _$jscmd("tests/router.js", "line", 29);
            app.get("/user/:name", function($) {
                _$jscmd("tests/router.js", "line", 30);
                $.end(_$jscmd("tests/router.js", "cond", "30_10_35", "Hello " + _$jscmd("tests/router.js", "cond", "30_19_26", $.params.name.capitalize())) + "!");
            });
            _$jscmd("tests/router.js", "line", 33);
            request.get("http://localhost:9000/user/john", function(error, response, body) {
                if (error) throw error;
                _$jscmd("tests/router.js", "line", 35);
                assert.equal(response.headers["content-type"], "text/plain");
                _$jscmd("tests/router.js", "line", 36);
                assert.equal(response.statusCode, 200);
                _$jscmd("tests/router.js", "line", 37);
                assert.equal(body, "Hello John!");
                _$jscmd("tests/router.js", "line", 38);
                done();
            });
        });
        _$jscmd("tests/router.js", "line", 42);
        it(_$jscmd("tests/router.js", "cond", "42_5_32", "app.post('/email', ..)".white) + _$jscmd("tests/router.js", "cond", "42_38_125", ' -should listen and receive "Your Email is email@test.com!" upon requesting POST /email with body email=email@test.com'.grey), function(done) {
            _$jscmd("tests/router.js", "line", 43);
            app.post("/email", function($) {
                _$jscmd("tests/router.js", "line", 44);
                $.end(_$jscmd("tests/router.js", "cond", "44_10_31", "Your Email is " + _$jscmd("tests/router.js", "cond", "44_29_12", $.body.email)) + "!");
            });
            _$jscmd("tests/router.js", "line", 47);
            request.post("http://localhost:9000/email", {
                form: {
                    email: "email@test.com"
                }
            }, function(error, response, body) {
                if (error) throw error;
                _$jscmd("tests/router.js", "line", 50);
                assert.equal(response.headers["content-type"], "text/plain");
                _$jscmd("tests/router.js", "line", 51);
                assert.equal(response.statusCode, 200);
                _$jscmd("tests/router.js", "line", 52);
                assert.equal(body, "Your Email is email@test.com!");
                _$jscmd("tests/router.js", "line", 53);
                done();
            });
        });
    });
});