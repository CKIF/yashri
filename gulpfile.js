var	gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    cache = require('gulp-cache'),
	sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    pug = require('gulp-pug'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require("gulp-babel");

var reload = browserSync.reload;

var params = {
    from: 'source/',
	out: 'public',
	htmlSrc: 'source/*.pug',
    levels: ['common.blocks']
};



gulp.task('default', ['build'], function (callback) {
    runSequence(['server'],
        callback
    )
});

gulp.task('build', function (callback) {
    runSequence('clean:public', 'css',
        ['useref', 'img'],
        callback
    )
});

gulp.task('clean:public', function() {
    return del.sync('public');
});


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: params.out
        }
    });
    gulp.watch(params.from + '**/*.*', ['build']);
});

gulp.task('html', function () {
   gulp.src(params.htmlSrc)
       .pipe(pug({pretty: true}))
       .pipe(rename('index.html'))
       .pipe(gulp.dest(params.out))
       .pipe(reload({stream: true}))
});

gulp.task('css', function () {
    gulp.src([params.from + 'styles.scss'/*, 'touch.blocks/**__DELETE_THIS__/*.scss'*/])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
        .pipe(cssnano())
        .pipe(rename('styles.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(params.out + "/css"))
        .pipe(reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src(params.from + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(params.out))
});

gulp.task('img', /*['sprite'],*/ function(){
    return gulp.src(params.from + '/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: false
        })))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(params.out + '/img'))
});

gulp.task('fonts', function() {
    return gulp.src(params.from + 'fonts/**/*')
        .pipe(gulp.dest(params.out + '/fonts'))
});

gulp.task('useref', ['html', 'fonts', 'js'],  function(){
    return gulp.src(params.out + '/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest(params.out))
});

