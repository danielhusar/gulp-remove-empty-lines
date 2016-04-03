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

it('Remove html comments', function (cb) {
  var stream = removeEmptyLines({removeComments: true});

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), 'test\ntest2\nhowdy');
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/index.html',
    contents: new Buffer('test\ntest2\n\n<!-- comment -->\nhowdy')
  }));

  stream.end();
});

it('Does not remove html comments from javascript files', function (cb) {
  var stream = removeEmptyLines({removeComments: true});

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), '(function() {\nvar comment = \'<!-- comment -->\'\n})();');
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/script.js',
    contents: new Buffer('\n\n(function() {\n\nvar comment = \'<!-- comment -->\'\n})();')
  }));

  stream.end();
});
