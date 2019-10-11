# Picture example

Example of full power of `<picture>` element in synergy with `gulp-responsive`.

## HTML layout

```html
<picture>
  <!-- webp images -->
  <source
    type="image/webp"
    srcset="
      examples/image-extralarge.webp,
      examples/image-extralarge@2x.webp 2x
    "
    media="(min-width: 1600px)"
  />
  <source
    type="image/webp"
    srcset="examples/image-large.webp, examples/image-large@2x.webp 2x"
    media="(min-width: 800px)"
  />
  <source
    type="image/webp"
    srcset="examples/image-small.webp, examples/image-small@2x.webp 2x"
  />
  <!-- jpeg images -->
  <source
    srcset="examples/image-extralarge.jpg, examples/image-extralarge@2x.jpg 2x"
    media="(min-width: 1600px)"
  />
  <source
    srcset="examples/image-large.jpg, examples/image-large@2x.jpg 2x"
    media="(min-width: 800px)"
  />
  <img
    srcset="examples/image-small.jpg, examples/image-small@2x.jpg 2x"
    alt="…"
  />
</picture>
```

`gulp-responsive` config:

```js
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('images', function () {
  return gulp
    .src('src/*.{jpg,png}')
    .pipe(
      $.responsive({
        'image.*': [
          {
            // image-small.jpg is 200 pixels wide
            width: 200,
            rename: {
              suffix: '-small',
              extname: '.jpg'
            }
          },
          {
            // image-small@2x.jpg is 400 pixels wide
            width: 200 * 2,
            rename: {
              suffix: '-small@2x',
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
            // image-large@2x.jpg is 960 pixels wide
            width: 480 * 2,
            rename: {
              suffix: '-large@2x',
              extname: '.jpg'
            }
          },
          {
            // image-extralarge.jpg is 1280 pixels wide
            width: 1280,
            rename: {
              suffix: '-extralarge',
              extname: '.jpg'
            }
          },
          {
            // image-extralarge@2x.jpg is 2560 pixels wide
            width: 1280 * 2,
            rename: {
              suffix: '-extralarge@2x',
              extname: '.jpg'
            }
          },
          {
            // image-small.webp is 200 pixels wide
            width: 200,
            rename: {
              suffix: '-small',
              extname: '.webp'
            }
          },
          {
            // image-small@2x.webp is 400 pixels wide
            width: 200 * 2,
            rename: {
              suffix: '-small@2x',
              extname: '.webp'
            }
          },
          {
            // image-large.webp is 480 pixels wide
            width: 480,
            rename: {
              suffix: '-large',
              extname: '.webp'
            }
          },
          {
            // image-large@2x.webp is 960 pixels wide
            width: 480 * 2,
            rename: {
              suffix: '-large@2x',
              extname: '.webp'
            }
          },
          {
            // image-extralarge.webp is 1280 pixels wide
            width: 1280,
            rename: {
              suffix: '-extralarge',
              extname: '.webp'
            }
          },
          {
            // image-extralarge@2x.webp is 2560 pixels wide
            width: 1280 * 2,
            rename: {
              suffix: '-extralarge@2x',
              extname: '.webp'
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
- [Browsers support for `<picture>` element form caniuse.com](http://caniuse.com/picture)
- [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
