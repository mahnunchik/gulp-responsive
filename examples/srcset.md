# Srcset example

Example configuration for usage with `srcset` attribute.

[About srcset attribute](https://responsiveimages.org/)

## Simple HTML layout

```html
<img
  srcset="examples/images/image.jpg 1x, examples/images/image@2x.jpg 2x"
  alt="…"
/>
```

Simple `gulp-responsive` configuration:

```js
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('images', function () {
  return gulp
    .src('src/*.{jpg,png}')
    .pipe(
      $.responsive({
        // Convert all images to JPEG format
        '*': [
          {
            width: 300,
            rename: {
              extname: '.jpg'
            }
          },
          {
            // Produce 2x images and rename them
            width: 300 * 2,
            rename: {
              suffix: '@2x',
              extname: '.jpg'
            }
          }
        ]
      })
    )
    .pipe(gulp.dest('dist'))
})
```

## Advanced HTML layout

```html
<img
  sizes="(min-width: 40em) 80vw, 100vw"
  srcset="
    examples/images/image-medium.jpg     375w,
    examples/images/image-large.jpg      480w,
    examples/images/image-extralarge.jpg 768w
  "
  alt="…"
/>
```

Advanced `gulp-responsive` configuration:

```js
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('images', function () {
  return gulp
    .src('src/*.{jpg,png}')
    .pipe(
      $.responsive({
        // Convert all images to JPEG format
        '*': [
          {
            // image-medium.jpg is 375 pixels wide
            width: 375,
            rename: {
              suffix: '-medium',
              extname: '.jpg'
            }
          },
          {
            // image-large.jpg is 480 pixels wide
            width: 480,
            rename: {
              suffix: '-large',
              extname: '.jpg'
            }
          },
          {
            // image-extralarge.jpg is 768 pixels wide
            width: 768,
            rename: {
              suffix: '-extralarge',
              extname: '.jpg'
            }
          }
        ]
      })
    )
    .pipe(gulp.dest('dist'))
})
```

## More info

- [Responsive Images Community Group](https://responsiveimages.org/)
- [A responsive image polyfill](https://scottjehl.github.io/picturefill/)
- [Browsers support for `srcset` attribute form caniuse.com](http://caniuse.com/srcset)
- [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
