
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
  })("tests/app.js", [1,2,3,5,6,7,8,9], {"6_4_17":0,"6_22_76":0}, ["require('../');","require('colors')","require('sugar');","","describe('Test: App', function(){\t","\tit('new App()'.white+' - should create new App Instance listening on http://localhost:3000/'.grey, function(){","\t\tvar app = new App({debug: false});","\t\tapp.domain('http://localhost:3000/');","\t\tapp.start();","\t})","});"]);
_$jscmd("tests/app.js", "line", 1);

require("../");

_$jscmd("tests/app.js", "line", 2);

require("colors");

_$jscmd("tests/app.js", "line", 3);

require("sugar");

_$jscmd("tests/app.js", "line", 5);

describe("Test: App", function() {
    _$jscmd("tests/app.js", "line", 6);
    it(_$jscmd("tests/app.js", "cond", "6_4_17", "new App()".white) + _$jscmd("tests/app.js", "cond", "6_22_76", " - should create new App Instance listening on http://localhost:3000/".grey), function() {
        _$jscmd("tests/app.js", "line", 7);
        var app = new App({
            debug: false
        });
        _$jscmd("tests/app.js", "line", 8);
        app.domain("http://localhost:3000/");
        _$jscmd("tests/app.js", "line", 9);
        app.start();
    });
});