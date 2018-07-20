"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");

const autoprefixer = require("gulp-autoprefixer");
const server = require("browser-sync").create();
const notify = require("gulp-notify");

const imagemin = require("gulp-imagemin");

const config = {
	src: {
		root: "./src",
		html: "./src/*.html",
		css: "./src/css/*.css",
		sass: "./src/sass/main.scss",
		pug: "./src/pug/**/index.pug",
		js: "./src/js/**/*.js",
		img: "./src/img/**/*",
		data: "./src/data/*.json",
		sw: "./src/sw.js"
	},
	dest: {
		root: "./build",
		css: "./build/css",
		js: "./build/js",
		img: "./build/img",
		data: "./build/data"
	},
	watch: {
		sass: "./src/sass/**/*.scss",
		html: "./src/*.html",
		js: "./src/js/**/*.js",
		data: "./src/data/*.json"
	}
};

// Compile sass files to css and import variables from json
gulp.task("sass", function() {
	return gulp
		.src(config.src.sass)
		.pipe(
			sass({
				outputStyle: "expanded",
				indentType: "tab",
				indentWidth: "1"
			}).on("error", sass.logError)
		)
		.pipe(
			autoprefixer({
				browsers: ["last 15 versions"],
				cascade: false
			})
		)
		.pipe(gulp.dest(config.dest.css));
});

gulp.task("html", function() {
	return gulp.src(config.src.html).pipe(gulp.dest(config.dest.root));
});

gulp.task("js", function() {
	return gulp.src(config.src.js).pipe(gulp.dest(config.dest.js));
});

gulp.task("sw", function() {
	return gulp.src(config.src.sw).pipe(gulp.dest(config.dest.root));
});

//pass data to build
gulp.task("data", function() {
	return gulp.src(config.src.data).pipe(gulp.dest(config.dest.data));
});

//Resize and minify images
gulp.task("images", function() {
	return gulp
		.src(config.src.img)
		.pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
		.pipe(gulp.dest(config.dest.img));
});

function reload(done) {
	server.reload();
	done();
}

function serve(done) {
	server.init({
		server: {
			baseDir: "./build"
		}
	});
	done();
}

// Watch files compiling
gulp.task("watch", function() {
	gulp.watch(config.watch.sass, gulp.series("sass", reload));
	gulp.watch(config.watch.html, gulp.series("html", reload));
	gulp.watch(config.watch.js, gulp.series(["js", "sw"], reload));
	gulp.watch(config.watch.data, gulp.series("data", reload));
});

gulp.task("default",
	gulp.series("html", "sass", "js", "images", "data", "sw", serve, "watch")
);