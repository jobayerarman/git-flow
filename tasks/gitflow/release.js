'use strict';

var fs     = require('fs');
var git    = require('gulp-git');
var gulp   = require('gulp');
var semver = require('semver');
var shell  = require('gulp-shell');
var tagVer = require('gulp-tag-version');
var config = require('../config').options;
var $      = require('../util.js');

var start = function(done) {
  let version = $.packageVersion();
  shell.task(`git flow release start -F ${version}`, {
    verbose: true
  })(done);
};

var commit = function(message) {
  return gulp.src(config.versionFiles)
    .pipe(git.commit('build(release): bump package version and update changelog', { emitData: true }))
    .on('data', function(data) {
      console.log(data);
    });
};

var tag = function() {
  return gulp.src(config.versionFiles)
    .pipe(tagVer());
};

var push = function(done) {
  git.push('origin', ['develop', 'master'], {
    args: '--tags',
    quiet: true
  }, done);
};

var finish = function(done) {
  shell.task('git flow release finish', {
    verbose: true
  })(done);
};

gulp.task('release:start', gulp.series('bump', 'changelog', commit));
gulp.task('release:finish', gulp.series(finish, tag, push));
