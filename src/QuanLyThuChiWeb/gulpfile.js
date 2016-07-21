/// <binding BeforeBuild='clean' AfterBuild='min' Clean='clean' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.minJsDest = paths.webroot + "wwwroot/site.min.js";
paths.minCssDest = paths.webroot + "wwwroot/site.min.css";

//specify js files path, order is important
paths.js = [
    paths.webroot + "js/app.js"
];

//specify cs files path, order is important
paths.css = [
    paths.webroot + "css/app.css"
];

gulp.task("clean:js", function (cb) {
    rimraf(paths.minJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.minCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src(paths.js)
      .pipe(concat(paths.minJsDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src(paths.css)
      .pipe(concat(paths.minCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);