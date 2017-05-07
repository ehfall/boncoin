var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var gulpUtil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var jshint = require('gulp-jshint');
var cssFilesVendorName = './config/cssFilesVendor.config.js';
var cssFilesVendor = require(cssFilesVendorName);
var jsFilesVendorName = './config/jssFilesVendor.config.js';
var jsFilesVendor = require(jsFilesVendorName);
var lintFileName =  './config/lint.config.js';
var lintFile = require(lintFileName);

gulp.task('cleanJs',function(){

	gulp.src('public/build/vendor.js')
		.pipe(clean());
});

gulp.task('cleanCss',function(){

	gulp.src('public/build/vendor.css')
		.pipe(clean());
});

gulp.task('lint',function(){
	gulp.src(lintFile.files)
		.pipe(jshint())
		.pipe(jshint.reporter(require('jshint-stylish')));
});


gulp.task('concatVendorJsFiles',function(){
	gulp.src(jsFilesVendor.jsFiles)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('public/build'));

});

gulp.task('concatVendorCssFiles',function(){
	gulp.src(cssFilesVendor.cssFiles)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('public/build'));
});
gulp.task('connect',function(){
	connect.server({root:'.',livereload:true});
});


gulp.task('watch',function(){
	gulp.watch(jsFilesVendorName,['cleanJs','concatVendorJsFiles']);
	gulp.watch(cssFilesVendorName,['cleanCss','concatVendorCssFiles']);
	gulp.watch(lintFileName,['lint']);

});

gulp.task('default',['cleanJs','cleanCss','lint','concatVendorJsFiles','concatVendorCssFiles','watch']);