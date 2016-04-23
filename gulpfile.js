/*
 * gulp-aem-sling-dev
 * https://github.com/dherges/gulp-aem-sling-dev
 *
 * Copyright (c) 2016 David Herges
 * Licensed under the MIT license.
 */

var gulp = require('gulp')
  , plugins = require('gulp-load-plugins')()
  , sling = require('./index.js')


gulp.task('default', function() {
  // place code for your default task here
})


// gulp sling
gulp.task('sling', ['default'], function() {
  gulp.src('./test/fixtures/jcr_root/**/*.txt')
    .pipe(sling({
      remote: 'http://localhost:4502',
      user: 'admin',
      pass: 'admin'
    }))

})


// gulp slingWatch
gulp.task('slingWatch', ['default'], function() {
  plugins.livereload.listen()

  gulp.src('./test/fixtures/jcr_root/**/*.txt')
    .pipe(plugins.watch('./test/fixtures/jcr_root/**/*.txt'))
    .pipe(sling())
    .pipe(plugins.livereload())

})


// gulp aemWatch
gulp.task('aemWatch', ['default'], function() {
  gulp.watch('./test/fixtures/jcr_root/**/*', function() {
    // TODO .... perform content sync
    // TODO ... maybe, this should be named ``crxWatch``
  })
})
