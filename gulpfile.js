import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import {deleteSync} from 'del';
import ttf2woff2 from 'gulp-ttf2woff2';

const sass = gulpSass(dartSass);

const path_src = 'src/';
const path_dist = 'docs/';

const pathes = {
    style_source: path_src + 'scss/',
    style_build: path_dist + 'css/',
    js_source: path_src + 'js/**/*.js',
    js_build: path_dist + 'js/',
    fonts_source: path_src + 'fonts/',
    fonts_build: path_dist + 'fonts/',
    html_source: path_src + 'html/',
    html_build: path_dist,
    img_source: path_src + 'img/',
    img_build: path_dist + 'img/',
}

const css_build = async () => {
    await deleteSync(pathes.style_build + '*')

	gulp.src(pathes.style_source + "*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
		.pipe(gulp.dest(pathes.style_build));
}

const build_js = async () => {
    await deleteSync(pathes.js_build + '*')

	gulp.src(pathes.js_source)
		.pipe(gulp.dest(pathes.js_build));
}

const build_fonts = async () => {
    await deleteSync(pathes.fonts_build + '*')

	gulp.src(pathes.fonts_source + '**/*.ttf')
        .pipe(ttf2woff2({clone: true}))
		.pipe(gulp.dest(pathes.fonts_build));
}

const build_html = async () => {
    await deleteSync(pathes.html_build + '*.html')

	gulp.src(pathes.html_source + '**/*.html')
		.pipe(gulp.dest(pathes.html_build));
}

const build_img = async () => {
    await deleteSync(pathes.img_build + '*')

	gulp.src(pathes.img_source + '/**/*')
		.pipe(gulp.dest(pathes.img_build));
}

export default () => {
    // настроить наблюдение на отдельный путь
    gulp.watch(pathes.style_source, async () => { await css_build()})
    gulp.watch(pathes.js_source, async () => { await build_js()})
    gulp.watch(pathes.fonts_source, async () => { await build_fonts()})
    gulp.watch(pathes.html_source, async () => { await build_html()})
    gulp.watch(pathes.img_source, async () => { await build_img()})
}
