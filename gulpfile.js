// VARIABLES & PATHS

let preprocessor = 'scss', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    baseDir      = '.', // Base directory path without «/» at the end
		baseDirJekyll= '_site/', // Base directory path for jekyll site without «/» at the end
		_includes    = './_includes/*.{' + fileswatch + '}',
		_layouts     = './_layouts/*.{' + fileswatch + '}',
		_assetsFiles = ['./*.{' + fileswatch + '}', _layouts, _includes, './**/**/*.yml' ]
    online       = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: {
		src: [
			'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
			'node_modules/jquery-ujs/src/rails.js',
			baseDir + '/js/swiper-lib.js',
			baseDir + '/js/select2.lib.js',
			baseDir + '/js/serviceShowContent.js',
			baseDir + '/js/contact_us.js',
			baseDir + '/js/hover.zoom.js',
			baseDir + '/js/modernizr.custom.js',
			baseDir + '/js/portfolio.js',
			baseDir + '/js/spinner.js',
			baseDir + '/js/typer.js',
			baseDir + '/js/fileUpload.js',
			baseDir + '/js/select2Init.js',
			baseDir + '/js/sliders.js',
			baseDir + '/js/menu.js',
			baseDir + '/js/app.js', // app.js. Always at the end
		],
		dest: baseDir + '/js',
	},

	styles: {
		src:  baseDir + '/' + preprocessor + '/main.*',
		dest: baseDir + '/css',
	},

	images: {
		src:  baseDir + '/images/src/**/*',
		dest: baseDir + '/images/dest',
	},

	deploy: {
		hostname:    'username@yousite.com', // Deploy hostname
		destination: 'yousite/public_html/', // Deploy destination
		include:     [/* '*.htaccess' */], // Included files to deploy
		exclude:     [ '**/Thumbs.db', '**/*.DS_Store' ], // Excluded files from deploy
	},

	cssOutputName: 'app.min.css',
	jsOutputName:  'app.min.js',

}

// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const sass         = require('gulp-sass');
const scss         = require('gulp-sass');
const less         = require('gulp-less');
const styl         = require('gulp-stylus');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const rsync        = require('gulp-rsync');
const del          = require('del');
const exec         = require("child_process").exec;
const spawn        = require("child_process").spawn;
const gutil        = require('gulp-util');

function browsersync() {
	browserSync.init({
		server: { baseDir: baseDirJekyll + '/' },
		notify: false,
		online: online,
		// tunnel: true,
	})
}

function scripts() {
	return src(paths.scripts.src)
	.pipe(concat(paths.jsOutputName))
	.pipe(uglify())
	.pipe(dest(paths.scripts.dest))
	.pipe(browserSync.stream())
}

function styles() {
	return src(paths.styles.src)
	.pipe(eval(preprocessor)())
	.pipe(concat(paths.cssOutputName))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
	.pipe(dest(paths.styles.dest))
	.pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin())
	.pipe(dest(paths.images.dest))
}

function cleanimg() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function deploy() {
	return src(baseDir + '/')
	.pipe(rsync({
		root: baseDir + '/',
		hostname: paths.deploy.hostname,
		destination: paths.deploy.destination,
		include: paths.deploy.include,
		exclude: paths.deploy.exclude,
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}
function jekyllBuild(done) {
	// exec("jekyll build", function (error, stdout, stderr) {
	// 	if (error) {
	// 		console.log(`exec error ${error}`);
	// 		return;
	// 	}
	// 	console.log("Build done");
	// 	done();
	// });
  const jekyll = spawn('jekyll', ['serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
}

const rebuildJekyll = series(jekyllBuild, function (cb) {
	browserSync.reload();
	console.log('Jekyll rebuilded');
	cb();
})

// const rebuildStyle = series(styles, jekyllBuild, function (cb) {
// 	console.log('Style rebuilded');
// 	cb();
// })


function startwatch() {
	watch(baseDir  + '/**/' + preprocessor + '/**/*', styles);
	watch(baseDir  + '/**/*.{' + imageswatch + '}', images);
	// watch(baseDir  + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
	// watch(_assetsFiles, rebuildJekyll);
	watch([baseDir + '/js/*.js', '!' + paths.scripts.dest + '/*.min.js'], scripts);
}

exports.browsersync   = browsersync;
exports.assets        = series(cleanimg, styles, scripts, jekyllBuild);
exports.styles        = styles;
exports.scripts       = scripts;
exports.images        = images;
exports.cleanimg      = cleanimg;
exports.deploy        = deploy;
exports.jekyllBuild   = jekyllBuild;
exports.rebuildJekyll = rebuildJekyll;
exports.default       = parallel(styles, scripts, browsersync, startwatch);
