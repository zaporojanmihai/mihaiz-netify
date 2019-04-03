"use strict";


var pAgree = getCookie('policy_agree');
if (!pAgree || pAgree !== '1') {
    $('.cookie-alert').addClass("show");
} else {
    $('.cookie-alert').removeClass("show");
    accept();
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(name, val) {
    var domain = document.domain === 'localhost'
    || document.domain === 'file'
    || document.domain === '' ? 'multifour.com' : document.domain;
    document.cookie = name + '=' + val + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/; domain=.'
        + domain + ';';
}

function accept () {
    var scripts = document.querySelectorAll('[data-cookiescript=accepted]');
    [].forEach.call(scripts, function (el) {
        if (el.tagName === 'SCRIPT') {
            el.setAttribute('type', 'text/javascript');
            var elClone = el.cloneNode(true);
            el.parentElement.insertBefore(elClone, el);
            el.parentElement.removeChild(el);
        } else if (el.tagName === 'IFRAME') {
            el.setAttribute('src', el.dataset.src);
        }
    });
}


window.addEventListener('load', function() {
//------------------------------------------------------------------------
//						TOOGLE BUTTON SCRIPT
//------------------------------------------------------------------------

$(".toogle-btn").on('click', function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $(href).toggleClass("show");
});

$(".toogle-btn.close").on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("show");
});

//------------------------------------------------------------------------
//						MENU TAP ON MOBILE DEVICES
//------------------------------------------------------------------------

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("nav.navbar").addClass("touchmenu");
    $(".sub-menu-link").on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("tap");
    });
}


//------------------------------------------------------------------------
//						SHOW NAVIGATION ON SCROLL DOWN
//------------------------------------------------------------------------

var $window = $(window);
$window.on('scroll', function () {
    var $nav = $('nav.show-on-scroll');
    var height = $nav.outerHeight();
    var scrollTop = $window.scrollTop();
    if (scrollTop > height*2) {
        $nav.addClass('show');
    } else {
        $nav.removeClass('show');
    }

});


//------------------------------------------------------------------------
//						HIDE NAVIGATION ON SCROLL DOWN
//------------------------------------------------------------------------

var prev = 0;
var $window = $(window);
$window.on('scroll', function () {
    var nav = $('nav.hide-on-scroll');
    var scrollTop = $window.scrollTop();
    nav.toggleClass('hide', scrollTop > prev);
    prev = scrollTop;
});



//------------------------------------------------------------------------
//						STICKY NAVIGATION
//------------------------------------------------------------------------

// Custom
window.stickyToggle = function (sticky, stickyWrapper, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyWrapperHeight = stickyWrapper.outerHeight();
    var stickyTop = stickyWrapper.offset().top - stickyHeight + stickyWrapperHeight;
    if (scrollElement.scrollTop() >= stickyTop) {
        stickyWrapper.height(stickyHeight);
        sticky.addClass("fixed-top");
    } else {
        sticky.removeClass("fixed-top");
        stickyWrapper.height('auto');
    }
};

// Find all data-toggle="sticky-onscroll" elements
$('.sticky-top').each(function () {
    var sticky = $(this);
    var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
    if (!sticky.next().hasClass('sticky-wrapper')) {
        sticky.after(stickyWrapper);
    } else {
        stickyWrapper = sticky.next();
    }

    window.stickyTB = window.stickyToggle.bind(window, sticky, stickyWrapper, $(window));
    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', window.stickyTB);

    // On page load
    window.stickyToggle(sticky, stickyWrapper, $(window));
});

//------------------------------------------------------------------------
//                    MAGNIFIC POPUP(LIGHTBOX) SETTINGS
//------------------------------------------------------------------------

$('.gallery').each(function () { // the containers for all your galleries
    var $this = $(this);
    $this.magnificPopup({
        delegate: '.video-popup, .image-popup', // the selector for gallery item
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: function (item) {
                return item.el.find('img').attr('alt');
            }
        },
        callbacks: {
            open: function() {
                $this.trigger('stop.owl.autoplay');
            },
            close: function() {
                $this.trigger('play.owl.autoplay');
            }
        },
        disableOn: function () {
            if (!pAgree || pAgree !== '1') {
                return false;
            }
            return true;
        }
    });
});

$('.masonry-filter').MasonryFilter({
    type: 'column-flex'
});
//------------------------------------------------------------------------
//						TOOGLE BUTTON SCRIPT
//------------------------------------------------------------------------

$(document).on('click', ".toogle-btn:not(.close)", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('href');
    $(href).toggleClass("show");
    $(this).parent().trigger("close.alert");
});

$(document).on('click', ".toogle-btn.close", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(this).parent().removeClass("show");
    $(this).parent().trigger("close.alert");
});

$(document).on('click', '[data-toggle=alert]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var href = $(this).attr('data-target');
    $(href).toggleClass("show");

    if(!$(href).hasClass("show")) $(href).trigger("close.alert");
    else $(href).trigger("open.alert");
});

$(document).on('click', '.cookie-alert .accept', function (e) {
    if (document.querySelector('.blr-active-page')) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    setCookie('policy_agree', '1');
    accept();
    $(this).closest('.cookie-alert').removeClass("show");
    $(this).closest('.cookie-alert').trigger("close.alert");

    var evetnCookieAccepted = new CustomEvent(
        'cookie.accepted'
        , {}
    );

    setTimeout(function () {
        document.dispatchEvent(evetnCookieAccepted);
        pAgree = '1';
    }, 2000);
});



});

window.addEventListener('load', function() {
	$('a.smooth').smoothScroll({speed: 800});
});

$('.video-popup').each( function(indx, el){
	if($(el).closest('.gallery').length === 0) {
		$(el).magnificPopup({
			type: 'iframe',
			iframe: {
				patterns: {
					youtube: {
						index: 'www.youtube.com/',
						id: 'v=',
						src: 'https://www.youtube.com/embed/%id%?autoplay=1'
					}
					, vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: 'https://player.vimeo.com/video/%id%?autoplay=1'
					}
				}
			},
			disableOn: function() {
				if (!pAgree || pAgree !== '1') {
					return false;
				}
				return true;
			}
		});
	}
});
$('.image-popup').each( function(indx, el){
	if($(el).closest('.gallery').length === 0) {
		$(el).magnificPopup({
			type: 'image'
		});
	}
});