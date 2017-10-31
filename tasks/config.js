'use strict';

var path = require('path');
var $    = module.exports;

$.config = {
  preset: 'angular',
  appDir: path.dirname(require.main.filename),
  packageJSON: 'package.json',
  changelogMD: 'CHANGELOG.md'
};
