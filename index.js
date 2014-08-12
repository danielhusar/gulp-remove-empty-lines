'use strict';
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function () {

  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-to-json', 'Streaming not supported'));
      return cb();
    }

    try {
      file.contents = new Buffer(file.contents.toString().replace(/^\s*[\r\n]/gm, ''));
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-remove-empty-lines', err));
    }

    this.push(file);
    return cb();

  });
};
