"use strict";

var gulp = require("gulp"),
    server = require("browser-sync").create(),
    less = require("gulp-less"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    mqpacker = require("css-mqpacker"),
    csso = require("gulp-csso"),
    plumber = require("gulp-plumber"),
    svgstore = require("gulp-svgstore"),
    rename = require("gulp-rename"),
    run = require("run-sequence"),
    uglify = require("gulp-uglify");


gulp.task("style", function(){
    gulp.src("less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({browsers: ["last 5 versions"]}),
        ]))
        .pipe(gulp.dest("css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("css"))
        .pipe(server.stream());
});


gulp.task("js", function(){
    gulp.src("js/main.js")
        .pipe(uglify())
        .pipe(rename("main.min.js" ))
        .pipe(gulp.dest("js"))
        .pipe(server.stream());
});

gulp.task("build", function(done){
    run("style", "js", done);
});


gulp.task("serve", function(){
    server.init({
        server: "."
    });
    gulp.watch("less/**/*.less", ["style"]);
    gulp.watch("js/**/*.js", ["js"]);
    gulp.watch("*.html")
        .on("change", server.reload);
});
