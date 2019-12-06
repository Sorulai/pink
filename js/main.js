var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
// var close = document.querySelector('.icon-close');



navToggle.addEventListener("click", function(evt){
	evt.preventDefault();
	if (navMain.classList.contains('main-nav--closed')){
	navMain.classList.remove('main-nav--closed');
	navMain.classList.add('main-nav--opened');
} else {
	if (navMain.classList.contains('main-nav--opened')){
	navMain.classList.remove('main-nav--opened');
	navMain.classList.add('main-nav--closed');
}
}
});
