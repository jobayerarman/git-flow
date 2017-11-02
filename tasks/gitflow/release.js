'use strict';

var fs     = require('fs');
var git    = require('gulp-git');
var gulp   = require('gulp');
var semver = require('semver');
var shell  = require('gulp-shell');
var tagVer = require('gulp-tag-version');
var config = require('../config').options;
var $      = require('../util.js');

function start(done) {
  let version = $.packageVersion();
  shell.task(`git flow release start -F ${version}`, {
    verbose: true
  })(done);
};

function commit(message) {
  return gulp.src(config.versionFiles)
    .pipe(git.commit('chore(release): bump package version and update changelog', { emitData: true }))
    .on('data', function(data) {
      console.log(data);
    });
};

function tag() {
  return gulp.src(config.versionFiles)
    .pipe(tagVer());
};

function push(done) {
  git.push('origin', ['develop', 'master'], {
    args: '--tags',
    quiet: true
  }, done);
};

function finish(done) {
  shell.task('git flow release finish', {
    verbose: true
  })(done);
};

gulp.task('release:start', gulp.series('bump', start, 'changelog', commit));
gulp.task('release:finish', gulp.series(finish, tag, push));
