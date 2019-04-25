$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    // bulma hamburger ----------------------------------------------------------------------------------------------

    // (function() {
    //     var burger = document.querySelector('.burger');
    //     var menu = document.querySelector('#'+burger.dataset.target);
    //     burger.addEventListener('click', function() {
    //         burger.classList.toggle('is-active');
    //         menu.classList.toggle('is-active');
    //     });
    // })();

    $('.hamburger').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $(this).parent().toggleClass('is-active');
    });

    // scroll to anchor ----------------------------------------------------------------------------------------------

    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.focus();
                        };
                    });
                }
            }
        });
});


// // bulma modals --------------------------------------------------------------------------------------------------
//
// const rootEl = document.documentElement;
// const $modals = getAll('.modal');
// const $modalButtons = getAll('.modal-button');
// const $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');
//
// if ($modalButtons.length > 0) {
//     $modalButtons.forEach(function ($el) {
//         $el.addEventListener('click', function () {
//             const target = $el.dataset.target;
//             const $target = document.getElementById(target);
//             rootEl.classList.add('is-clipped');
//             $target.classList.add('is-active');
//         });
//     });
// }

// if ($modalCloses.length > 0) {
//     $modalCloses.forEach(function ($el) {
//         $el.addEventListener('click', function () {
//             closeModals();
//         });
//     });
// }

// document.addEventListener('keydown', function (event) {
//     const e = event || window.event;
//     if (e.keyCode === 27) {
//         closeModals();
//     }
// });
//
// function closeModals() {
//     rootEl.classList.remove('is-clipped');
//     $modals.forEach(function ($el) {
//         $el.classList.remove('is-active');
//     });
// }

// Functions

// function getAll(selector) {
//     return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
// }


    // smooth page scroll ----------------------------------------------------------------------------------------------

    // $.event.props.push("wheelDelta");
    // $.easing.easeOutQuint = function (x, t, b, c, d) {
    //     return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    // };
    //
    // var docH = $(document).height() - $(window).height(),
    //     scrollTop = $(window).scrollTop();
    //
    // $(document).on("DOMMouseScroll mousewheel", function (e, delta) {
    //
    //     // clamp the scroll offset
    //     scrollTop = Math.min(docH, Math.max(0, scrollTop - (delta || e.wheelDelta)));
    //
    //     $("body, html").stop().animate({
    //         scrollTop: scrollTop
    //     }, 1000, "easeOutQuint");
    //
    //     e.preventDefault();
    // });