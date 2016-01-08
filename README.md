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

* name: *String* — filename glob pattern
* width: *Number* or *String* — width in pixels or percentage of the original, not set by default
* height: *Number* or *String* — height in pixels or percentage of the original, not set by default
* withoutEnlargement: *Boolean* — do not enlarge the output image, default `true`
* skipOnEnlargement: *Boolean* — do not write an output image at all if the original image is smaller than the configured width or height, default `false`
* min: *Boolean* — preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to the `width` and `height` specified
* max: *Boolean* — resize to the max width or height the preserving aspect ratio (both `width` and `height` have to be defined), default `false`
* quality: *Number* — output quality for JPEG, WebP and TIFF, default `80`
* progressive: *Boolean* — progressive (interlace) scan for JPEG and PNG output, default `false`
* withMetadata: *Boolean* — include image metadata, default `false`
* compressionLevel: *Number* — zlib compression level for PNG, default `6`
* rename: *String*, *Object* or *Function* — renaming options, file will not be renamed by default. When `extname` is specified, output format is parsed from extension. You can override this autodetection with `format` option.
* format: *String* — output format `jpeg`, `png`, `webp` or `raw`, default is `null`
* crop: Crop the resized image to the exact size specified, default is `false`
* embed: Preserving aspect ratio, resize the image to the maximum `width` or `height` specified then `embed` on a `background` of the exact `width` and `height` specified, default is `false`
* ignoreAspectRatio: *Boolean* — Ignoring the aspect ratio of the input, stretch the image to the exact `width` and/or `height` provided via `resize`, default is `false`
* interpolation: 'default is `bicubic`'
* background: *String* — Set the background for the embed and flatten operations, '#default is `fff`'
* flatten: *Boolean* — Merge alpha transparency channel, if any, with `background`, default is `false`
* rotate: *Boolean* — Rotate the output image by either an explicit angle or auto-orient based on the EXIF `Orientation` tag, default is `false`
* flip: *Boolean* — Flip the image about the vertical Y axis. This always occurs after rotation, if any. The use of `flip` implies the removal of the EXIF `Orientation` tag, if any. Default is `false`
* flop: *Boolean* — Flop the image about the horizontal X axis. This always occurs after rotation, if any. The use of `flop` implies the removal of the EXIF `Orientation` tag, if any. Default is `false`
* blur: *Boolean* — When used without parameters, performs a fast, mild blur of the output image. This typically reduces performance by 10%. Default is `false`
* sharpen: *Boolean* — When used without parameters, performs a fast, mild sharpen of the output image. This typically reduces performance by 10%. Default is `false`
* gamma: *Boolean* — Apply a gamma correction by reducing the encoding (darken) pre-resize at a factor of `1/gamma` then increasing the encoding (brighten) post-resize at a factor of `gamma`. Default is `false`
* grayscale: *Boolean* — Convert to 8-bit greyscale; 256 shades of grey, default is `false`
* normalize: *Boolean* — Enhance output image contrast by stretching its luminance to cover the full dynamic range. This typically reduces performance by 30%. Default is `false`
* withoutChromaSubsampling: *Boolean* — Disable the use of [chroma subsampling](http://en.wikipedia.org/wiki/Chroma_subsampling) with JPEG output (4:4:4), default is `false`

Detailed description of each option can be found in the [sharp readme](https://github.com/lovell/sharp#image-transformation-options).

Renaming is implemented by [rename](https://github.com/popomore/rename) module. Options are correspond options of [gulp-rename](https://github.com/hparra/gulp-rename) module.

#### options

##### errorOnUnusedConfig

Type: `boolean`  
Default: `true`

Emit error when configuration is not used.

##### errorOnUnusedImage

Type: `boolean`  
Default: `true`

Emit error when image is not used.

##### passThroughUnused

Type: `boolean`  
Default: `false`

Keep unmatched images in the stream.
To use this option `errorOnUnusedImage` should be `false`.

##### errorOnEnlargement

Type: `boolean`  
Default: `true`

Emit error when image is enlarged.


You can specify the following global configuration parameters in the `options` object:

* withoutEnlargement: *Boolean* - do not enlarge the output image
* skipOnEnlargement: *Boolean* - do not write an output image at all if the original image is smaller than the configured width or height
* quality: *Number* - output quality for JPEG, WebP and TIFF
* progressive: *Boolean* - progressive (interlace) scan for JPEG and PNG output
* withMetadata: *Boolean* - include image metadata
* compressionLevel: *Number* - zlib compression level for PNG

## License

MIT © [Eugeny Vlasenko](https://github.com/mahnunchik)
