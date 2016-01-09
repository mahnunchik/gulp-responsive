# Advanced example

If you need to resize images to different sizes and converted them into different image format.

In this example shown convertation of one input PNG images to the output JPG and WEBP images.

```js
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
  return gulp.src('src/*.png')
    .pipe($.responsive({
      '*.png': [{
        width: 300,
        rename: {
          suffix: '-300px',
          extname: '.jpg',
        },
        format: 'jpeg',
      }, {
        width: 600,
        rename: {
          suffix: '-600px',
          extname: '.jpg',
        },
        // format option can be omitted because
        // format of output image is detected from new filename
        // format: 'jpeg'
      }, {
        width: 1900,
        rename: {
          suffix: '-1900px',
          extname: '.jpg',
        },
        // Do not enlarge the output image if the input image are already less than the required dimensions.
        withoutEnlargement: true,
      }, {
        // Convert images to the webp format
        width: 630,
        rename: {
          suffix: '-630px',
          extname: '.webp',
        },
      }],
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      // Do not emit the error when image is enlarged.
      errorOnEnlargement: false,
    }))
    .pipe(gulp.dest('dist'));
});
```

[gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
