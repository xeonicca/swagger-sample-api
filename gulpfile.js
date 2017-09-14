var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var yaml = require('gulp-yaml');

var nodemonConfig = {
  script: 'app.js',
  ignore: [
    'gulpfile.js',
    'node_modules/',
    'swagger/'
  ]
}

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon(nodemonConfig).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  });
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:9487',
    port: '3000'
  });
});


gulp.task('yaml', function() {
  gulp.src('swagger/*.yml')
    .pipe(yaml({ space: 2 }))
    .pipe(gulp.dest('./swagger/'))
})

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['swagger/swagger.yml'], ['yaml']);
  gulp.watch(['swagger/swagger.json'], reload);
});