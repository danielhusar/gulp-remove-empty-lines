'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var removeEmptyLines = require('./index');

it('Remove empty lines', function (cb) {

  var stream = removeEmptyLines();

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), 'test\ntest2');
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/index.html',
    contents: new Buffer('test\n\n\ntest2')
  }));

  stream.end();

});
