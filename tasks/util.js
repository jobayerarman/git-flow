'use strict';

var argv     = require('yargs').argv;
var fs       = require('fs');
var git      = require('gulp-git');
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var notify   = require('gulp-notify');
var path     = require('path');
var plumber  = require('gulp-plumber');
var readline = require('readline');
var shell    = require('gulp-shell');
var semver   = require('semver');
var config   = require('./config').options;
var $        = module.exports;

$.packageVersion = function(file) {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won"t be updated
  file = file || path.resolve(config.appDir, './package.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')).version;
};

$.reportError = function (error) {
  let lineNumber = error.lineNumber ? 'Line ' + error.lineNumber + ' -- ' : '';

  notify({
    title: 'Task Failed [' + error.plugin + ']',
    message: lineNumber + 'See console.',
    sound: true
  }).write(error);

  gutil.beep();

  // Pretty error reporting
  let report = '';
  let chalk = gutil.colors.white.bgRed;

  report += chalk('TASK:') + ' [' + error.plugin + ']\n';
  report += chalk('ISSUE:') + ' ' + error.message + '\n';
  if (error.lineNumber) {
    report += chalk('LINE:') + ' ' + error.lineNumber + '\n';
  }
  if (error.fileName) {
    report += chalk('FILE:') + ' ' + error.fileName + '\n';
  }
  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit('end');
};
