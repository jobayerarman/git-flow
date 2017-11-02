'use strict';

var argv     = require('yargs').argv;
var bump     = require('gulp-bump');
var gulp     = require('gulp');
var path     = require('path');
var semver   = require('semver');
var settings = require('../config');
var config   = settings.options;
var helper   = require('../util');
var recommendedBump = require('conventional-recommended-bump');

function bumpVersion(done) {

  var version = {};
  version.pkg = helper.packageVersion();
  version.arg = argv.v || argv.t || '';

  var file = path.resolve(config.appDir, config.versionFiles);

  recommendedBump({
    preset: config.preset
  },
  function (error, result) {
    version.auto = semver.inc(version.pkg, result.releaseType);
    if (version.arg) {
      version.manual = semver.inc(version.pkg, version.arg);
    }
    if (version.manual && !semver.valid(version.manual)) {
      console.log('Invalid version: %s', version.manual);
    }
    if (version.manual && semver.gt(version.pkg, version.manual)) {
      console.log('Current version: %s is less than existing version: %s', version.manual, version.pkg);
    }

    version.final = version.manual || version.auto;

    gulp.src(file)
      .pipe(bump({ version: version.final }))
      .pipe(gulp.dest(config.appDir));
  });

  done();
};

gulp.task('bump', bumpVersion);
