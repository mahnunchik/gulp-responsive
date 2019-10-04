# image-set example

Example configuration for usage with CSS `image-set` method.

## CSS markup

```css
.image {
  /* fallback */
  background-image: url('background-image.png');
  /* image-set */
  background-image: image-set(
    'background-image.png' 1x,
    'background-image@2x.png' 2x,
    'background-image@3x.png' 3x
  );
}
```

`gulp-responsive` configuration:

```js
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('images', function () {
  return gulp
    .src('src/*.{jpg,png}')
    .pipe(
      $.responsive({
        // Convert all images to PNG format
        'background-*.*': [
          {
            width: 300,
            rename: {
              extname: '.png'
            }
          },
          {
            // Produce 2x images
            width: 300 * 2,
            rename: {
              suffix: '@2x',
              extname: '.png'
            }
          },
          {
            // Produce 3x images
            width: 300 * 3,
            rename: {
              suffix: '@3x',
              extname: '.png'
            }
          }
        ]
      })
    )
    .pipe(gulp.dest('dist'))
})
```

## More info

- [Specification](https://drafts.csswg.org/css-images-3/#image-set-notation)
- [Browsers support for `image-set` method form caniuse.com](http://caniuse.com/css-image-set)
- [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
