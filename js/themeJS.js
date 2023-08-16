
/////////// scroll events ///////////

var socialBarSide = document.getElementById('social-bar-side');
var socialBarContact = document.getElementById('social-bar-contact');
var vHeight = window.innerHeight;
var contactHeight = 5.5 * vHeight;
var action = 'off';
document.addEventListener('scroll', function () {
    var scrollAmount = window.pageYOffset;
    if (scrollAmount > contactHeight && action == 'off') {
        action = 'on';
        socialBarContact.classList.toggle('zero-width');
        socialBarSide.classList.toggle('zero-height');
    } else if (action == 'on' && scrollAmount > contactHeight - 300 && scrollAmount < contactHeight) {
        action = 'off';
        socialBarContact.classList.toggle('zero-width');
        socialBarSide.classList.toggle('zero-height');
    } else {
        return;
    }
});

/////////// Nav Bar ///////////

var navbar = document.getElementById('navbar');
/////////// Menu ///////////

var menuBtn = document.getElementById('menu-btn');
var menu = document.getElementById('menu');
var menuSVG = document.getElementById('menu-svg');
var menuLinks = document.getElementById('menu-links');
var navLogo = document.getElementById('cyberlogo');

menuBtn.onclick = menuOp;

function menuOp() {
    menu.classList.toggle("open");
    menuBtn.classList.toggle("open");
    menuSVG.classList.toggle("open");
    menuLinks.classList.toggle("open");
    navLogo.classList.toggle('no-see');
}

/////////// Services ///////////

//var digiExp = document.getElementById("Digital-exp");
//digiExp.onclick = function(){swiper.slideTo(0)};
