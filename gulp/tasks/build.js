// var gulp = require('gulp');
// var usemin = require('gulp-usemin');
// // imagemin = require('gulp-imagemin');
// cssnano = require('gulp-cssnano');
// var uglify = require('gulp-uglify');
// // var htmlmin = require('gulp-htmlmin');
// // var cleanCss = require('gulp-clean-css');
// var rev = require('gulp-rev');
// del = require('del');

// gulp.task('deleteDistFolder', function(){
//     return del("./dist");
// });

// gulp.task('copyImagesFolder', ['deleteDistFolder'], function() {
//     return gulp.src("./app/assets/images/**/*")
//     // .pipe(imagemin({
//     //     progressive: true,
//     //     interlanced: true,
//     //     multipass: true
//     // }))
//     .pipe(gulp.dest("./dist/assets/images"));
// });
 
// gulp.task('usemin', ['deleteDistFolder'], function() {
//   return gulp.src("./app/index.html")
//     .pipe(usemin({
//       css: [ rev(), cssnano() ],
//     //   html: [ htmlmin({ collapseWhitespace: true }) ],
//       js: [ uglify(), rev() ],
//       inlinejs: [ uglify() ]
//     //   inlinecss: [ cleanCss(), 'concat' ]
//     }))
//     .pipe(gulp.dest("./dist"));
// });

// gulp.task('build', ['deleteDistFolder', 'copyImagesFolder', 'usemin']);



// // var gulp = require('gulp'),
// // imagemin = require('gulp-imagemin'),
// // del = require('del'),
// // usemin = require('gulp-usemin'),
// // rev = require('gulp-rev'),
// // cssnano = require('gulp-cssnano'),
// // uglify = require('gulp-uglify');

// // gulp.task('deleteDistFolder', function(){
// //     return del('./dist');
// // });

// // gulp.task('optimizeImages', ['deleteDistFolder'], function(){
// //     return gulp.src("./app/assets/images/**/*")
// //     .pipe(imagemin({
// //         progressive: true,
// //         interlanced: true,
// //         multipass: true
// //     }))
// //     .pipe(gulp.dest("./dist/assets/images"));
// // });

// // gulp.task('usemin', ['deleteDistFolder'], function(){
// //     return gulp.src("./app/index.html")
// //     .pipe(gulp.dest("./dist"));
// // });

// // // gulp.task('usemin', ['deleteDistFolder'], function(){
// // //     return gulp.src("./app/index.html")
// // //     .pipe(usemin({
// // //         css: [function(){return rev()}, function(){return cssnano()}],
// // //         js: [function(){return rev()}, function(){return uglify()}]
// // //     }))
// // //     .pipe(gulp.dest("./dist"));
// // // });

// // gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);

var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], function() {
  return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    // .pipe(imagemin({
    //   progressive: true,
    //   interlaced: true,
    //   multipass: true
    // }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function(){
  gulp.start("usemin");
});

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);