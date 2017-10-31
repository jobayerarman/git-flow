'use strict';

var gulp = require("gulp");
var git = require("gulp-git");
var fs = require("fs");
var argv = require("yargs").argv;
var readline = require("readline");
var path = require("path");
var version = require("conventional-recommended-bump");
var $ = module.exports;

$.packageVersion = function (file) {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won"t be updated
  file = file || path.resolve($.config.appDir, "./package.json");
  return JSON.parse(fs.readFileSync(file, "utf8")).version;
};
