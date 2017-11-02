'use strict';

var fs        = require('fs');
var gulp      = require('gulp');
var path      = require('path');
var changelog = require('gulp-conventional-changelog');
var config    = require('../config').options;
var helper    = require('../util');

function changelog() {
  var file = path.resolve(config.appDir, config.changelogFile);

  if (!fs.existsSync(file)) {
    return gulp.src(file, {
      buffer: false,
      read: false
    })
      .pipe(changelog({
        preset: config.preset,
        releaseCount: 0
      }))
      .pipe(gulp.dest(config.appDir));
  }

  return gulp.src(file, {
    buffer: false
  })
    .pipe(changelog({
      preset: config.preset
    }))
    .pipe(gulp.dest(config.appDir));
};

gulp.task('changelog', changelog);
