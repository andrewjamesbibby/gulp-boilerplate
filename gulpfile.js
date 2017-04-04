
var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var useref 		= require('gulp-useref');
var uglify 		= require('gulp-uglify');
var gulpIf 		= require('gulp-if');
var cleanCSS 	= require('gulp-clean-css');
var del 		= require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var revReplace	= require('gulp-rev-replace');
var rev			= require('gulp-rev');
var filter      = require('gulp-filter');

gulp.task('sass', function() {
	return gulp.src([
			'src/scss/main.scss',
		])
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
		    stream: true
		}))
});

gulp.task('browserSync', function() {
 	browserSync.init({
    	server: {
      		baseDir: 'src'
    	},
  })
})

gulp.task('useref', function(){

	var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });
	
	return gulp.src('src/*.html')
    	.pipe(useref())
    	.pipe(gulpIf('*.js', uglify()))
    	.pipe(gulpIf('*.css', cleanCSS()))
    	.pipe(indexHtmlFilter)
    	.pipe(rev())    
    	.pipe(indexHtmlFilter.restore)          
    	.pipe(revReplace())    
    	.pipe(gulp.dest('dist'))
});

gulp.task('fonts', function(){
	return gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('images', function(){
	return gulp.src('src/images/**/*')
	.pipe(gulp.dest('dist/images'))
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('build', function(callback){
	runSequence('clean','sass','useref','fonts','images', callback)
});

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browserSync.reload); 
	gulp.watch('src/js/**/*.js', browserSync.reload); 
});

gulp.task('default', function () {
	gulp.start('sass');
});

