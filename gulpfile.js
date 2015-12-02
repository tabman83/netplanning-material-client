/*global -$ */
'use strict';
// generated on 2015-10-26 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var modRewrite = require('connect-modrewrite');
var NwBuilder = require('nw-builder');
var runSequence = require('run-sequence');
var installed = require('installed');
var sh = require('shelljs');

gulp.task('styles', function () {
    return gulp.src('app/styles/main.css')
        .pipe($.sourcemaps.init())
        .pipe($.postcss([
            require('autoprefixer-core')({browsers: ['last 1 version']})
        ]))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['styles'], function () {
    var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

    return gulp.src('app/**/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.ngAnnotate({single_quotes: true})))
        //.pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('www'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        })))
        .pipe(gulp.dest('www/images'));
});

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')({
        filter: '**/*.{eot,svg,ttf,woff,woff2}'
    }).concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('www/fonts'));
});

gulp.task('extras', function () {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('www'));
});

gulp.task('locales', function () {
    return gulp.src([
        'app/locales/*'
    ], {
        dot: true
    }).pipe(gulp.dest('www/locales'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve:dist', ['styles', 'fonts'], function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['www'],
            middleware: [
                modRewrite([
                    '^[^\\.]*$ /index.html [L]'
                ])
            ]
        }
    });
});

gulp.task('serve', ['styles', 'fonts'], function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            },
            middleware: [
                modRewrite([
                    '^[^\\.]*$ /index.html [L]'
                ])
            ]
        }
    });

    // watch for changes
    gulp.watch([
        'app/**/*.html',
        'app/scripts/**/*.js',
        'app/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.css', ['styles']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/*.html')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras', 'locales'], function () {
    return gulp.src('www/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', function (done) {
    runSequence(
        'clean',
        'build',
        done
    );
});

/** cordova nwjs tasks **************************/

gulp.task('nwjs', function (done) {
    runSequence(
        'nwjs:clean',
        'default',
        'nwjs:build',
        done
    );
});

gulp.task('nwjs:build', function () {
	
	var files = ['package.json', 'www/**/*'];

	installed(process.cwd(), {
		dev: false,
		depth: 0,
		extraneous: false
	}, function(err, pkgs) {
		if (err) throw err;
		pkgs.forEach(function(pkg) {
			files.push('node_modules/' + pkg.name + '/**/*');
		});
		
		var nw = new NwBuilder({
			version: '0.12.3',
			files: files,
			buildDir: 'nwjs',
			winIco: "./res/icon.ico",
			//macIcns: path.join(buildConfig.targets.resourcesFolder, 'icon.icns'),
			platforms: ['win32', 'osx64', 'linux32']
		});
		nw.build();		
	});
});

gulp.task('nwjs:clean', function (done) {
    del('nwjs').then(function() {
		done();
	});
});
