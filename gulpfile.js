'use strict';

var gulp = require('gulp'),
    bump = require('gulp-bump'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    include = require('gulp-file-include'),
    cleanCSS = require('gulp-clean-css');

var path = {
    bowerDir: './bower_components',
    bump: ['./bower.json', './package.json'],
    dist: {
        html: '',
        js: 'js/',
        css: 'css/',
        img: 'img/',
        fonts: 'fonts/',
        portfolio: 'portfolio/'
    },
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        portfolio: 'build/portfolio/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        portfolio: 'src/portfolio/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        portfolio: 'src/portfolio/**/*.*'
    },
    clean: {
        build: './build',
        dist: './dist'
    }
};

var config = {
    server: {
        baseDir: "./build"
    },
    host: 'localhost',
    port: 9000,
    logPrefix: "fenrirheimr"
};

gulp.task('html:build', function (done) {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true, indent: true}));
    done();
});

gulp.task('html:dist', function (done) {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html));
    done();
});

gulp.task('style:build', function (done) {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('style:dist', function (done) {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.dist.css));
    done();
});

gulp.task('image:build', function (done) {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('image:dist', function (done) {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img));
    done();
});

gulp.task('fonts:build', function (done) {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
    done();
});

gulp.task('fonts:dist', function (done) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
    done();
});

gulp.task('js:build', function (done) {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('js:dist', function (done) {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.js));
    done();
});

gulp.task('portfolio:build', function (done) {
    gulp.src(path.src.portfolio)
        .pipe(gulp.dest(path.build.portfolio));
    done();
});

gulp.task('portfolio:dist', function (done) {
    gulp.src(path.src.portfolio)
        .pipe(gulp.dest(path.dist.portfolio));
    done();
});

gulp.task('clean:build', function(done, cb) {
    rimraf.sync(path.clean.build, cb);
    done();
});

gulp.task('clean:dist', function(done, cb) {
    rimraf.sync(path.clean.build, cb);
    done();
});

gulp.task('project:build', gulp.series('clean:build', 'html:build', 'style:build', 'image:build', 'portfolio:build', 'fonts:build', 'js:build', function(done) {
    done();
}));

gulp.task('project:dist', gulp.series('clean:dist', 'html:dist', 'style:dist', 'image:dist', 'portfolio:dist', 'fonts:dist', 'js:dist', function(done) {
    done();
}));

gulp.task('build', gulp.series('clean:build', 'html:build', 'style:build', 'js:build', 'fonts:build', 'image:build', function(done) {
    done();
}));

gulp.task('dist', gulp.series('clean:dist', 'html:dist', 'style:dist', 'js:dist', 'fonts:dist', 'image:dist', function(done) {
    done();
}));

gulp.task('watch', gulp.parallel('build', function() {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
    gulp.watch(path.watch.portfolio, gulp.series('portfolio:build'));

}));

gulp.task('browserSync', function(done) {
    browserSync.init(config);
    done();
});

gulp.task('default', gulp.series('clean:build', 'project:build', gulp.parallel('browserSync', 'watch')));