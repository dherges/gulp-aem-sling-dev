/*
 * gulp-aem-sling-dev
 * https://github.com/dherges/gulp-aem-sling-dev
 *
 * Copyright (c) 2016 David Herges
 * Licensed under the MIT license.
 */

var gulp = require('gulp')
  , watch = require('gulp-watch')
  , livereload = require('gulp-livereload')
  , sling = require('aem-sling-dev-well').sling


gulp.task('default', function() {
  // place code for your default task here
})


// gulp sling
gulp.task('sling', ['default'], function() {
  gulp.src('./test/fixtures/jcr_root/**/*.js')
    .pipe(sling({
      remote: 'http://localhost:4502',
      user: 'admin',
      pass: 'admin'
    })) // TODO ... pipe to http dest

})


// gulp slingWatch
gulp.task('slingWatch', ['default'], function() {
  livereload.listen()

  gulp.src('./test/fixtures/jcr_root/**/*.js')
    .pipe(watch('./test/fixtures/jcr_root/**/*.js'))
    .pipe(sling())
    .pipe(livereload())

})


// gulp aemWatch
gulp.task('aemWatch', ['default'], function() {
  gulp.watch('./test/fixtures/jcr_root/**/*', function() {
    // TODO .... perform content sync
    // TODO ... maybe, this should be named ``crxWatch``
  })
})
