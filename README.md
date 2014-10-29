# [gulp](http://gulpjs.com)-responsive [![Build Status](https://travis-ci.org/mahnunchik/gulp-responsive.svg?branch=master)](https://travis-ci.org/mahnunchik/gulp-responsive)

> Generates images at different sizes


## Install


`gulp-responsive` depends on [sharp](https://github.com/lovell/sharp). Sharp is one of the fastest Node libraries for resizing JPEG, PNG, WebP and TIFF images. 

Before installing `gulp-responsive` you should install the [libvips](https://github.com/jcupitt/libvips) library. Further information and instructions can be found in the [sharp readme](https://github.com/lovell/sharp#installation).

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
      rename: 'logo@2x.png'
    },{
      name: 'background-*.png',
      width: 700
    }]))
    .pipe(gulp.dest('dist'));
});
```

## API

### responsive(config, options)

#### config

Configuration can be provided in one of the following formats:

##### 1.  Array of unique configurations

```js
[{
  name: 'logo.png',
  width: 200,
  height: 100
},{
  name: 'banner.png',
  width: 500
}]
```

##### 2. Object of unique configurations. Keys are filenames.

```js
{
  'logo.png': {
    width: 300,
    height: 200,
    raname: 'logo@2x.png'
  },
  'background-*.png': {
    width: 1400,
    withoutEnlargement: true
  }
}
```

##### 3. Object of arrays of unique configurations. Keys are filenames.

```js
{
  'logo.png': [{
      width: 200,
      raname: 'logo@1x.png'
    },{
      width: 400,
      rename: 'logo@2x.png'
    }],
  'background-*': [{
    height: 400
  }]
}
```

Configuration unit is an object:

* name: *String* - filename glob pattern
* width: *Number* - not set by default
* height: *Number* - not set by default
* withoutEnlargement: *Boolean* - default true
* rename: *String* - new filename, file will not be renamed by dafault

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
