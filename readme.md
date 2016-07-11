# [gulp](http://gulpjs.com)-remove-empty-lines [![Build Status](https://secure.travis-ci.org/danielhusar/gulp-remove-empty-lines.svg?branch=master)](http://travis-ci.org/danielhusar/gulp-remove-empty-lines)

Remove empty lines from files.

## Install

```
npm install --save-dev gulp-remove-empty-lines
```

## Usage

```javascript
var gulp = require('gulp');
var removeEmptyLines = require('gulp-remove-empty-lines');

gulp.task('tojson', function () {
  gulp.src('./public/*.html')
  .pipe(removeEmptyLines())
  .pipe(gulp.dest('./public/'));
});

gulp.task('htmlClean', function () {
  gulp.src('./index.html')
  .pipe(removeEmptyLines({
    removeComments: true
  }))
  .pipe(gulp.dest('./public/'));
});
```

## Options

##### removeComments

Type: `boolean`
Default: `false`

Remove all the comments from the html files.

##### removeSpaces

Type: `boolean`
Default: `false`

Remove all duplicate spaces from any file.

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
