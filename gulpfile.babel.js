//JAVASCRIPT
import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";

//COMMON
import concat from "gulp-concat";

//PUG
import pug from "gulp-pug";

//SASS
import sass from "gulp-sass";

//CLEAN CSS
import clean from "gulp-purgecss";

//VARIABLES
const production = false;

gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(concat("scripts-min.js"))
    .pipe(gulp.dest("./public/js"));
});

gulp.task("views", () => {
  return gulp
    .src("./src/views/pages/*.pug")
    .pipe(
      pug({
        pretty: !production,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/styles.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(gulp.dest("./public/css"));
});

gulp.task("clean", () => {
  return gulp
    .src("./public/css/styles.css")
    .pipe(
      clean({
        content: ["./public/*.html"],
      })
    )
    .pipe(gulp.dest("./public/css"));
});

gulp.task("default", () => {
  gulp.watch("./src/js/*.js", gulp.series("babel"));
  gulp.watch("./src/scss/*.scss", gulp.series("sass"));
  gulp.watch("./src/views/**/*.pug", gulp.series("views"));
});
