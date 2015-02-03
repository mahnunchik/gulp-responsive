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
    },{
      name: 'cover.png',
      width: '50%'
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
    rename: 'logo@2x.png'
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
      rename: 'logo@1x.png'
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
* width: *Number* or *String* - width in pixels or percentage of the original, not set by default
* height: *Number* or *String* - height in pixels or percentage of the original, not set by default
* withoutEnlargement: *Boolean* - do not enlarge the output image, default `true`
* quality: *Number* - output quality for JPEG, WebP and TIFF, default `80`
* progressive: *Boolean* - progressive (interlace) scan for JPEG and PNG output, default `false`
* withMetadata: *Boolean* - include image metadata, default `false`
* compressionLevel: *Number* - zlib compression level for PNG, default `6`
* rename: *String* - renaming options, file will not be renamed by default
* background: *String* - HTML color or hex color string, not set by default
* embed: *Boolean* - whether to use [sharp's embed](https://github.com/lovell/sharp#embed) option, default `false`
* max: *Boolean* - whether to use [sharp's max](https://github.com/lovell/sharp#max) option, default `false`
* flatten: *Boolean* - whether to use [sharp's flatten](https://github.com/lovell/sharp#flatten) option, default `false`
* jpeg: *Boolean* - use JPEG format for output image, default `false`
* webp: *Boolean* - use WebP format for output image, default `false`
* png: *Boolean* - use PNG format for output image, default `false`

Detailed description of each option can be found in the [sharp readme](https://github.com/lovell/sharp#image-transformation-options).

Renaming is implemented by [rename](https://github.com/popomore/rename) module. Options are correspond options of [gulp-rename](https://github.com/hparra/gulp-rename) module.

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


You can specify the following global configuration parameters in the `options` object:

* withoutEnlargement: *Boolean* - do not enlarge the output image
* quality: *Number* - output quality for JPEG, WebP and TIFF
* progressive: *Boolean* - progressive (interlace) scan for JPEG and PNG output
* withMetadata: *Boolean* - include image metadata
* compressionLevel: *Number* - zlib compression level for PNG

## License

MIT © [Eugeny Vlasenko](https://github.com/mahnunchik)
