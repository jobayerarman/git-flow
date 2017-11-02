'use strict';

var path = require('path');
var $    = module.exports;

$.options = {
  preset: 'angular',
  appDir: path.dirname(__dirname + '/'),
  versionFiles: 'package.json',
  changelogFile: 'CHANGELOG.md',
  origin: 'origin',
  masterBranch: 'master',
  developBranch: 'develop',
  featureBranch: 'feature/',
  releaseBranch: 'release/',
  bugfixBranch: 'bugfix/',
  hotfixBranch: 'hotfix/',
  tagPrefix: 'v',
  push: false
};
