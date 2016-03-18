# [gulp](http://gulpjs.com)-responsive [![Build Status](https://travis-ci.org/mahnunchik/gulp-responsive.svg?branch=master)](https://travis-ci.org/mahnunchik/gulp-responsive)

> Generates images at different sizes


## Installation


`gulp-responsive` depends on [sharp](https://github.com/lovell/sharp). Sharp is one of the fastest Node.js modules for resizing JPEG, PNG, WebP and TIFF images.

If you are using Mac OS then before installing `gulp-responsive` you should install the [libvips](https://github.com/jcupitt/libvips) library. Further information and instructions can be found in the [sharp installation guide](http://sharp.dimens.io/en/stable/install/).

```sh
$ npm install --save-dev gulp-responsive
```


## Usage

```js
var gulp = require('gulp');
var responsive = require('gulp-responsive');

gulp.task('default', function () {
  return gulp.src('src/*.{png,jpg}')
    .pipe(responsive({
      'background-*.jpg': {
        width: 700,
        quality: 50
      },
      'cover.png': {
        width: '50%',
        // convert to jpeg format
        format: 'jpeg',
        rename: 'cover.jpg'
      },
      // produce multiple images from one source
      'logo.png': [
        {
          width: 200
        },{
          width: 200 * 2,
          rename: 'logo@2x.png'
        }
      ]
    ))
    .pipe(gulp.dest('dist'));
});
```

## [Examples](./examples)

* [Simple example](./examples/simple.md)
* [Multiple resolutions](./examples/multiple-resolutions.md)
* [Advanced example](./examples/advanced.md)

### Integration

* [HTML `srcset` attribute](./examples/srcset.md)
* [HTML `<picture>` element](./examples/picture.md)
* [CSS `image-set` method](./examples/image-set.md)

### All together :fireworks:

* [`gulp-responsive` config generation example](./examples/gulp-responsive-config.md)

## API

### responsive([config](#config), [options](#options))

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

#### Configuration unit

Configuration unit is an object:

* **name**: *String* — filename glob pattern.
* **width**: *Number* or *String* — width in pixels or percentage of the original, not set by default.
* **height**: *Number* or *String* — height in pixels or percentage of the original, not set by default.
* [**withoutEnlargement**](http://sharp.dimens.io/en/stable/api/#withoutenlargement): *Boolean* — do not enlarge the output image, default `true`.
* **skipOnEnlargement**: *Boolean* — do not write an output image at all if the original image is smaller than the configured width or height, default `false`.
* [**min**](http://sharp.dimens.io/en/stable/api/#min): *Boolean* — preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to the `width` and `height` specified.
* [**max**](http://sharp.dimens.io/en/stable/api/#max): *Boolean* — resize to the max width or height the preserving aspect ratio (both `width` and `height` have to be defined), default `false`.
* [**quality**](http://sharp.dimens.io/en/stable/api/#qualityquality): *Number* — output quality for JPEG, WebP and TIFF, default `80`.
* [**progressive**](http://sharp.dimens.io/en/stable/api/#progressive): *Boolean* — progressive (interlace) scan for JPEG and PNG output, default `false`.
* [**withMetadata**](http://sharp.dimens.io/en/stable/api/#withmetadatametadata): *Boolean* — include image metadata, default `false`.
* [**compressionLevel**](http://sharp.dimens.io/en/stable/api/#compressionlevelcompressionlevel): *Number* — zlib compression level for PNG, default `6`.
* [**rename**](#renaming): *String*, *Object* or *Function* — renaming options, file will not be renamed by default. When `extname` is specified, output format is parsed from extension. You can override this autodetection with `format` option.
* [**format**](http://sharp.dimens.io/en/stable/api/#toformatformat): *String* — output format `jpeg`, `png`, `webp` or `raw`, default is `null`.
* [**crop**](http://sharp.dimens.io/en/stable/api/#cropgravity): Crop the resized image to the exact size specified, default is `false`.
* [**embed**](http://sharp.dimens.io/en/stable/api/#embed): Preserving aspect ratio, resize the image to the maximum `width` or `height` specified then `embed` on a `background` of the exact `width` and `height` specified, default is `false`.
* [**ignoreAspectRatio**](http://sharp.dimens.io/en/stable/api/#ignoreaspectratio): *Boolean* — Ignoring the aspect ratio of the input, stretch the image to the exact `width` and/or `height` provided via `resize`, default is `false`.
* [**interpolation**](http://sharp.dimens.io/en/stable/api/#interpolatewithinterpolator): *String* — Use the given interpolator for image resizing, 'default is `bicubic`'.
* [**background**](http://sharp.dimens.io/en/stable/api/#backgroundrgba): [*Color*](https://www.npmjs.com/package/color) — Set the background for the embed and flatten operations, '#default is `fff`'.
* [**flatten**](http://sharp.dimens.io/en/stable/api/#flatten): *Boolean* — Merge alpha transparency channel, if any, with `background`, default is `false`.
* [**negate**](http://sharp.dimens.io/en/stable/api/#negate): *Boolean* — Produces the "negative" of the image, default is `false`.
* [**rotate**](http://sharp.dimens.io/en/stable/api/#rotateangle): *Boolean* — Rotate the output image by either an explicit angle or auto-orient based on the EXIF `Orientation` tag, default is `false`.
* [**flip**](http://sharp.dimens.io/en/stable/api/#flip): *Boolean* — Flip the image about the vertical Y axis. This always occurs after rotation, if any. The use of `flip` implies the removal of the EXIF `Orientation` tag, if any. Default is `false`.
* [**flop**](http://sharp.dimens.io/en/stable/api/#flop): *Boolean* — Flop the image about the horizontal X axis. This always occurs after rotation, if any. The use of `flop` implies the removal of the EXIF `Orientation` tag, if any. Default is `false`.
* [**blur**](http://sharp.dimens.io/en/stable/api/#blursigma): *Boolean* — When used without parameters, performs a fast, mild blur of the output image. This typically reduces performance by 10%. Default is `false`.
* [**sharpen**](http://sharp.dimens.io/en/stable/api/#sharpenradius-flat-jagged): *Boolean* — When used without parameters, performs a fast, mild sharpen of the output image. This typically reduces performance by 10%. Default is `false`.
* [**threshold**](http://sharp.dimens.io/en/stable/api/#thresholdthreshold): *Number* or *Boolean* — Converts all pixels in the image to greyscale white or black, default is `false`.
* [**gamma**](http://sharp.dimens.io/en/stable/api/#gammagamma): *Boolean* — Apply a gamma correction by reducing the encoding (darken) pre-resize at a factor of `1/gamma` then increasing the encoding (brighten) post-resize at a factor of `gamma`. Default is `false`.
* [**grayscale**](http://sharp.dimens.io/en/stable/api/#grayscale-greyscale): *Boolean* — Convert to 8-bit greyscale; 256 shades of grey, default is `false`.
* [**normalize**](http://sharp.dimens.io/en/stable/api/#normalize-normalise): *Boolean* — Enhance output image contrast by stretching its luminance to cover the full dynamic range. This typically reduces performance by 30%. Default is `false`.
* [**tile**](http://sharp.dimens.io/en/stable/api/#tilesize-overlap): *Boolean* or *Object* — The size and overlap, in pixels, of square Deep Zoom image pyramid tiles, default is `false`.
* [**withoutChromaSubsampling**](http://sharp.dimens.io/en/stable/api/#withoutchromasubsampling): *Boolean* — Disable the use of [chroma subsampling](http://en.wikipedia.org/wiki/Chroma_subsampling) with JPEG output (4:4:4), default is `false`.

Detailed description of each option can be found in the [sharp API documentation](http://sharp.dimens.io/en/stable/api/).

##### Renaming
Renaming is implemented by the [rename](https://www.npmjs.com/package/rename) module. Options correspond with options of [gulp-rename](https://www.npmjs.com/package/gulp-rename).

#### options

##### errorOnUnusedConfig

Type: `Boolean`  
Default: `true`

Emit the error when configuration is not used.

##### errorOnUnusedImage

Type: `Boolean`  
Default: `true`

Emit the error when image is not used.

##### passThroughUnused

Type: `Boolean`  
Default: `false`

Keep unmatched images in the stream.
To use this option `errorOnUnusedImage` should be `false`.

##### errorOnEnlargement

Type: `Boolean`  
Default: `true`

Emit the error when image is enlarged.

##### stats

Type: `Boolean`  
Default: `true`

Show statistics after the run — how many images were created, how many were matched and how many were in the run in total.

##### silent

Type: `Boolean`  
Default: `false`

Silence messages and stats if 0 images were created. If you wish to supress all messages and stats, set the `options.stats` to `false` as well.

> You can specify **global default value** for any of the [configuration options](#configuration-unit).

```js
gulp.task('default', function () {
  return gulp.src('src/*.png')
    .pipe(responsive(config, {
      // global quality for all images
      quality: 50,
      errorOnUnusedImage: false
    }))
    .pipe(gulp.dest('dist'));
});

```

## License

MIT © [Evgeny Vlasenko](https://github.com/mahnunchik)
