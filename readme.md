# [gulp](http://gulpjs.com)-responsive [![Build Status](https://travis-ci.org/mahnunchik/gulp-responsive.svg?branch=master)](https://travis-ci.org/mahnunchik/gulp-responsive)

> Lorem ipsum


## Install

```sh
$ npm install --save-dev gulp-responsive
```


## Usage

```js
var gulp = require('gulp');
var responsive = require('gulp-responsive');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(responsive())
		.pipe(gulp.dest('dist'));
});
```


## API

### responsive(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Eugeny Vlasenko](https://github.com/mahnunchik)
