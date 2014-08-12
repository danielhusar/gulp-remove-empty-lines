'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var removeEmptyLines = require('./index');

it('Remove empty lines', function (cb) {

  var stream = removeEmptyLines();

  stream.on('data', function (file) {
    console.log(file.contents.toString());
    assert.equal(file.contents.toString(), 'testtest2');
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/index.html',
    contents: new Buffer('test    \ntest2')
  }));

  stream.end();

});
