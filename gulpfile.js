"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
// const jsonImporter = require("node-sass-json-importer");

const autoprefixer = require("gulp-autoprefixer");
// const pug = require("gulp-pug");
const server = require("browser-sync").create();
const notify = require("gulp-notify");

// const responsive = require("gulp-responsive");
// const imagemin = require("gulp-imagemin");

// const reload = browserSync.reload;
// const del = require('del');

const config = {
	src: {
		root: "./src",
		html: "./src/*.html",
		css: "./src/css/*.css",
		sass: "./src/sass/main.scss",
		pug: "./src/pug/**/index.pug",
		js: "./src/js/**/*.js",
		img: "./src/img/**/*",
		data: "./src/data/*.json"
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
		data:  "./src/data/*.json"
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
		.pipe(gulp.dest(config.dest.css))
});

gulp.task("html", function() {
	return gulp
		.src(config.src.html)
		// .pipe(
		// 	sass({
		// 		importer: jsonImporter,
		// 		outputStyle: "expanded",
		// 		indentType: "tab",
		// 		indentWidth: "1"
		// 	}).on("error", sass.logError)
		// )
		.pipe(gulp.dest(config.dest.root))
});

// Compile pug files to html
// gulp.task("pug", () => {
// 	return gulp
// 		.src(config.src.pug)
// 		.pipe(
// 			pug({
// 				pretty: "\t"
// 			})
// 		)
// 		.on(
// 			"error",
// 			notify.onError(function(error) {
// 				return {
// 					title: "Pug",
// 					message: error.message
// 				};
// 			})
// 		)
// 		.pipe(gulp.dest(config.dest.root));
// });

gulp.task("js", function() {
	return gulp
		.src(config.src.js)
		.pipe(gulp.dest(config.dest.js))
});

//pass data to build
gulp.task("data", function() {
	return gulp
		.src(config.src.data)
		.pipe(gulp.dest(config.dest.data))
});

//Resize and minify images
gulp.task("images", function() {
	return gulp
		.src(config.src.img)
		// .pipe(
		// 	responsive(
		// 		{
		// 			"*": {
		// 				height: 200
		// 			}
		// 		},
		// 		{
		// 			quality: 70,
		// 			progressive: true,
		// 			compressionLevel: 6,
		// 			withMetadata: false,
		// 			withoutEnlargement: true,
		// 			errorOnEnlargement: false,
		// 			silent: true,
		// 			stats: true
		// 		}
		// 	)
		// )
		// .pipe(imagemin())
		.pipe(gulp.dest(config.dest.img));
});

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './build'
    }
  });
  done();
}

// Watch files compiling
gulp.task("watch", function() {
	gulp.watch(config.watch.sass, gulp.series("sass", reload));
	gulp.watch(config.watch.html, gulp.series("html", reload));
	gulp.watch(config.watch.js, gulp.series("js", reload));
	gulp.watch(config.watch.data, gulp.series("data", reload));
});

gulp.task("default", gulp.series("html", "sass", "js", "data", serve, "watch"));

//Build
// gulp.task("build", ["removedist", "sass", "pug", "js", "images"]);

// gulp.task("removedist", function() {
// 	return del.sync(config.dest.root);
// });