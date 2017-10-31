'use strict';

var gulp = require('gulp');
var gitflow = require('./tasks/gitflow');

// Simple tasks
gulp.task('init', gitflow.init);

function defaultTask(done) {
  console.log('Gulp task running...');
  done();
}

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', defaultTask);
