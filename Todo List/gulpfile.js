var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
 
gulp.task('buildServer',  function () {
  var tsResult = gulp.src('./app.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('./'));
});


gulp.task('nodemon', ['buildServer', 'watch'], function(){
    nodemon({
        script: './app.js',
        //text:'./noPlate.txt'
    }).on('restart', function(){
        console.log('nodemon restarted server.js');
    })
})

gulp.task('watch', function() {
  gulp.watch(['./app.ts'], ['buildServer']);
});
gulp.task('default', ['buildServer']);