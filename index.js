'use strict';

var gutil = require('gulp-util');
var through = require('through2');

function clean(fileContent, fileExtension, options) {
  fileContent = fileContent.toString() || '';
  options = options || {};

  if (fileContent === null || fileContent === '') {
    return '';
  }

  if ( (fileExtension === 'html' || fileExtension === 'php') && options.removeComments) {
    fileContent = fileContent.replace(/<!--[^>]*-->/gm, '');
  }

  if (options.removeSpaces) {
    fileContent = fileContent.replace(/\s\s+/g, ' ');
  }

  return fileContent.replace(/^\s*[\r\n]/gm, '');
}

function removeEmptyLines(options) {
  var fileExtension;
  options = options || {};

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-remove-empty-lines', 'Streaming not supported'));
      return cb();
    }

    try {
      fileExtension = file.path.split('.').pop();
      file.contents = new Buffer(clean(file.contents, fileExtension, options));
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-remove-empty-lines', err));
    }

    this.push(file);
    return cb();
  });
}

module.exports = removeEmptyLines;
