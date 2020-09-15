'use strict';

var assert = require('assert');
var Vinyl = require('vinyl');
var removeEmptyLines = require('./index');

it('Remove empty lines', function (cb) {
  var stream = removeEmptyLines();

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), 'test\ntest2');
    cb();
  });

  stream.write(new Vinyl({
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

  stream.write(new Vinyl({
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

  stream.write(new Vinyl({
    base: __dirname,
    path: __dirname + '/script.js',
    contents: new Buffer('\n\n(function() {\n\nvar comment = \'<!-- comment -->\'\n})();')
  }));

  stream.end();
});

it('Remove duplicate spaces', function (cb) {
  var stream = removeEmptyLines({removeSpaces: true});

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), 'test space\ntest2 space\ntest3 space');
    cb();
  });

  stream.write(new Vinyl({
    base: __dirname,
    path: __dirname + '/index.html',
    contents: new Buffer('test space\ntest2  space\ntest3   space')
  }));

  stream.end();
});

it('Not throw for empty files', function (cb) {
  var stream = removeEmptyLines({removeSpaces: true});

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), '');
    cb();
  });

  stream.write(new Vinyl({
    base: __dirname,
    path: __dirname + '/index.html',
    contents: new Buffer('')
  }));

  stream.end();
});
