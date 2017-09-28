const gulp = require('gulp'),
    p = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    path = {
      build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        libs: 'build/js/libs'
      },
      src: {
        html: 'src/html/**/*.html',
        style: 'src/scss/**/*.scss',
        js: 'src/js/script.js',
        img: [
          'src/img/**/*.*',
          '!src/img/icons/*.*'
        ],
        icons: 'src/img/icons/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: [
          'libs/bower/jquery/dist/jquery.min.js',
          'libs/bower/popper.js/dist/umd/popper.min.js',
          'libs/bower/bootstrap/dist/js/bootstrap.min.js',
          'libs/bower/bootstrap-switch/dist/js/bootstrap-switch.min.js'
        ]
      },
      watch: {
        html: 'src/**/*.(html|njk)',
        style: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.*',
        icons: [
          'src/img/icons/*.*',
          'src/scss/templates/_sprite_template.scss'
        ]
      },
      clean: './build'
    },
    config = {
      server: {
        baseDir: "./build"
      },
      open: false,
      host: 'localhost',
      port: 9000,
      logPrefix: "Frontend_MaxShylov"
    }
// versionConfig = {
//   'value': '%MDS%',
//   'append': {
//     'key': 'v',
//     'to': ['css', 'js']
//   }
// };
//

gulp.task('html', () => {
  gulp.src(path.src.html)
      .pipe(p.nunjucksRender({path: ['src/html/templates']}))
      .pipe(p.htmlPrettify({indent_size: 2}))
      .pipe(gulp.dest(path.build.html))
});

gulp.task('svg', function () {
  return gulp.src(path.src.icons)
      .pipe(p.svgmin({
        js2svg: {pretty: true}
      }))
      .pipe(p.svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
            render: {
              scss: {
                dest: '../../../scss/_sprite.scss',
                template: "src/scss/templates/_sprite_template.scss"
              }
            }
          }
        }
      }))
      .pipe(p.cheerio({
        run: function ($) {
          $('[viewBox]').each(function () {
            var symbol = $(this);
            symbol.attr('widht', '100%');
            symbol.attr('height', '100%');
          });
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(gulp.dest('src/img/i/'));
});

gulp.task('img', () => {
  gulp.src(path.src.img)
      .pipe(gulp.dest(path.build.img))
});

gulp.task('style', () => {
  gulp.src(path.src.style)
      .pipe(p.sourcemaps.init())
      .pipe(p.sass().on('error', p.sass.logError))
      .pipe(p.autoprefixer('last 100 versions', '>0.01%', 'ie <= 8'))
      .pipe(p.sourcemaps.write())
      .pipe(gulp.dest(path.build.css))
      .pipe(reload({stream: true}))
})

gulp.task('js', done => {
  gulp.src(path.src.js)
      .pipe(p.sourcemaps.init())
      .pipe(p.fileInclude({
        prefix: '//=='
      }))
      .pipe(p.babel({
        presets: ['es2015']
      }).on('error', error => done(error)))
      .pipe(p.sourcemaps.write())
      .pipe(gulp.dest(path.build.js))
      .on('end', () => done())
})

gulp.task('fonts', () => {
  gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
})

gulp.task('libs', () => {
  gulp.src(path.src.libs)
      .pipe(gulp.dest(path.build.libs))
})


gulp.task('build', [
  'html',
  'libs',
  'fonts',
  'js',
  'style',
  'img',
  'svg'
]);


gulp.task('watch', () => {
  p.watch(path.watch.html, (e, cb) => gulp.start('html'));
  p.watch(path.watch.style, (e, cb) => gulp.start('style'));
  p.watch(path.watch.js, (e, cb) => gulp.start('js'));
  p.watch(path.watch.img, (e, cb) => gulp.start('img'));
  p.watch(path.watch.icons, (e, cb) => gulp.start('svg'));
});

gulp.task('server', () => browserSync(config));

gulp.task('clean', cb => rimraf(path.clean, cb));

gulp.task('default', ['build', 'server', 'watch']);
