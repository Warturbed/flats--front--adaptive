const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const imagemin = require('gulp-imagemin')
//const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const concat = require('gulp-concat')
//const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
  return src('src/**.html')
    //.pipe(include({
    //  prefix: '@@'
    //}))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('build'))
}

function scss() {
  return src('src/styles/*.scss')
    .pipe(sass())
    //.pipe(autoprefixer({
    //  browsers: ['last 2 versions']
    //}))
    .pipe(csso())
    //.pipe(concat('index.css'))
    .pipe(dest('build/styles'))
    .pipe(dest('src/styles'))
}

function css() {
  return src('src/styles/nouislider.min.css')
    .pipe(csso())
    //.pipe(concat('index.css'))
    .pipe(dest('build/styles'))
}

function fonts() {
  return src('src/styles/fonts/PT-Root-UI/*')
    .pipe(dest('build/styles/fonts/PT-Root-UI'))
}

function js() {
  return src('src/js/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(dest('build/js'))
    .pipe(dest('src/js'))
}

function img() {
    return src('src/img/*')
      .pipe(imagemin())
      .pipe(dest('build/img'))
}

function clear() {
  return del('build')
}

function serve() {
  sync.init({
    server: './src'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch(['src/styles/**.scss', 'src/styles/*/**.scss'], series(scss)).on('change', sync.reload)
}

exports.build = series(clear, scss, css, fonts, html, img, js)
exports.serve = series(clear, scss, css, fonts, html, img, js, serve)
exports.clear = clear