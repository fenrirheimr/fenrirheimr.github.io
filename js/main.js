
(function($) {
    "use strict";

    $('.resume-link').click(function(e) {
        e.preventDefault();
        $('#resume-text').slideToggle('slow');
    })
    ;$('.redone-link').click(function(e) {
        e.preventDefault();
        $('.redone-wrapper').slideToggle('slow');
    });

    $(window).on('load', function(e) {
        setTimeout( function() {
            $('.pageloader').removeClass('is-active');
        }, 3000 );
    });


    // tags filter ---------------------------------------------------------------------------------------------------

    $('.portfolio-nav a').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('is-warning')) {
            return false
        }
        const selectYear = $(this).text();
        filter(selectYear);
        $(this).addClass('is-warning').siblings().removeClass('is-warning');
        if ($(this).hasClass('all')) {
            $('.select-year').show('slow');
        }

    });

    function filter(e) {
        const regex = new RegExp('\\b' + e + '\\b');
        $('.select-year').hide('slow').filter(function () {
            return regex.test($(this).data('year'))
        }).show('slow');
    }

    // bulma modals --------------------------------------------------------------------------------------------------

    var rootEl = document.documentElement;
    var $modals = getAll('.modal');
    var $modalButtons = getAll('.modal-button');
    var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

    if ($modalButtons.length > 0) {
        $modalButtons.forEach(function ($el) {
            $el.addEventListener('click', function () {
                var target = $el.dataset.target;
                var $target = document.getElementById(target);
                rootEl.classList.add('is-clipped');
                $target.classList.add('is-active');
            });
        });
    }

    if ($modalCloses.length > 0) {
        $modalCloses.forEach(function ($el) {
            $el.addEventListener('click', function () {
                closeModals();
            });
        });
    }

    document.addEventListener('keydown', function (event) {
        var e = event || window.event;
        if (e.keyCode === 27) {
            closeModals();
        }
    });

    function closeModals() {
        rootEl.classList.remove('is-clipped');
        $modals.forEach(function ($el) {
            $el.classList.remove('is-active');
        });
    }

    // Functions

    function getAll(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    }

    // scroll to anchor ----------------------------------------------------------------------------------------------

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    // animation show elements ---------------------------------------------------------------------------------------

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    // $('.timeline-item').animateCss('slideInDown');

    //usage $( '.class-name' ).animateCss('slideInDown');


    // bulma hamburger ----------------------------------------------------------------------------------------------

    (function() {
        var burger = document.querySelector('.burger');
        var menu = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    })();

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

    $(".hamburger").on("click", function () {
        $(this).toggleClass("is-active");
        $('#navigation').toggleClass("is-active");

        $('#navigation').slideToggle('medium', function() {
            if ($(this).is(':visible'))
                $(this).css('display','flex');
        });
    });


})(jQuery);