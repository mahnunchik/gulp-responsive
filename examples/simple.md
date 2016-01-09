# Simple example

If you need to resize all images to the predetermined size and compress them.

```js
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
  return gulp.src('src/*.{jpg,png}')
    .pipe($.responsive({
      '*.jpg': {
        // Resize all JPG images to 200 pixels wide
        width: 200,
      },
      '*.png': {
        // Resize all PNG images to 50% of original pixels wide
        width: '50%',
      },
      // Resize all images to 100 pixels wide and add suffix -thumbnail
      '*': {
        width: 100,
        rename: { suffix: '-thumbnail' },
      },
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Zlib compression level of PNG output format
      compressionLevel: 6,
      // Strip all metadata
      withMetadata: false,
    }))
    .pipe(gulp.dest('dist'));
});
```

### Without comments

```js
gulp.task('images', function () {
  return gulp.src('src/*.{jpg,png}')
    .pipe($.responsive({
      '*.jpg': { width: 200 },
      '*.png': { width: '50%' },
      '*': {
        width: 100,
        rename: { suffix: '-thumbnail' },
      },
    }, {
      quality: 70,
      progressive: true,
      compressionLevel: 6,
      withMetadata: false,
    }))
    .pipe(gulp.dest('dist'));
});
```

[gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
