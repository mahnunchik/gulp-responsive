# [gulp](http://gulpjs.com)-responsive [![Build Status](https://travis-ci.org/mahnunchik/gulp-responsive.svg?branch=master)](https://travis-ci.org/mahnunchik/gulp-responsive)

> Generates images at different sizes


## Install

```sh
$ npm install --save-dev gulp-responsive
```


## Usage

```js
var gulp = require('gulp');
var responsive = require('gulp-responsive');

gulp.task('default', function () {
  return gulp.src('src/*.png')
    .pipe(responsive([{
      name: 'logo.png',
      width: 200
    },{
      name: 'logo.png',
      width: 200 * 2,
      rename: 'logo@2x/png'
    },{
      name: 'background-*.png',
      width: 700
    }]))
    .pipe(gulp.dest('dist'));
});
```


## API

### responsive(config, options)

#### options

##### strictMatchConfig

Type: `boolean`  
Default: `true`

Emit error when configuration is not used.

##### strictMatchImages

Type: `boolean`  
Default: `true`

Emit error when image is not used.

##### errorOnEnlargement

Type: `boolean`  
Default: `true`

Emit error when image is enlarged.

## License

MIT © [Eugeny Vlasenko](https://github.com/mahnunchik)
