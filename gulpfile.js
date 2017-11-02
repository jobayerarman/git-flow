'use strict';

var gulp       = require('gulp');
var requireDir = require('require-dir');
requireDir('./tasks', { recurse: true });

function defaultTask(done) {
  console.log('Gulp task running...\n');
  done();
}

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', defaultTask);
