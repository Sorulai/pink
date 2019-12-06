var gulp = require("gulp"); 
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");                //Отслеживание ошибок// 
var postcss = require("gulp-postcss");						//Работает с автопрефиксером//
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();			//Живая перезагрузка//
var csso = require("gulp-csso");							//Минификатор//
var rename = require("gulp-rename");						//переименование файлов//
var imagemin = require("gulp-imagemin");					//минификатор изображений//
var webp = require("gulp-webp");											//преобразование ищображений в веб формат//
var svgstore = require("gulp-svgstore");											//svg спрайт//
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del")




gulp.task("clean", function(){
	return del("build");
});


gulp.task("copy", function(){
	return gulp.src([
			"img/**",
			"js/**",
			"*.html"
		], {
			base: "."
		})
	.pipe(gulp.dest("build"));

});



			//Компиляция sass//

gulp.task("sass", function() {
	return gulp.src("scss/style.scss")
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([
		autoprefixer()

		]))
	.pipe(gulp.dest("build/css"))
	.pipe(csso())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("build/css"))
	.pipe(server.stream());
});


				//Минификация изображений//

gulp.task("images", function(){
	return gulp.src("build/img/**/*.{png,jpg}")
	.pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true})
      ]))
	.pipe(gulp.dest("build/img"));
});



					//svg спрайт//

gulp.task("sprite", function(){
	return gulp.src("build/img/icon-*.svg")
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename("sprite.svg"))
	.pipe(gulp.dest("build/img"));
});

						//преобразование изображений в веб формат//

gulp.task("webp", function(){
	return gulp.src("build/img/**/*.{png,jpg}")
	pipe(webp({quality: 90}))
	.pipe(gulp.dest("build/img/"));
});


gulp.task("html", function(){
	return gulp.src("*.html")
		.pipe(posthtml([
			include()
		]))
	.pipe(gulp.dest("build"));
});


gulp.task("html:copy", function() {
	return gulp.src("*.html")
		.pipe(gulp.dest("build"));
});


gulp.task("html:update",gulp.series("html:copy"),function(done) {
   server.reload();
   done();
});
		//Отслеживание и перезагрузка//

gulp.task("serve", function(){
server.init({
	server: "build/",
	notify: false,
    open: true,
    cors: true,
    ui: false

});

gulp.watch("sass/**/*.{scss,sass}", gulp.series("sass"));
gulp.watch("*.html", gulp.series("html:update"));
});


gulp.task('build', gulp.series(
		"clean",
		"copy",
		"sass",
		"images",
		"sprite",
		"html"

	));
