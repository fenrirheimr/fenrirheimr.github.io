//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/vivus/dist/vivus.min.js
//= ../../bower_components/bootstrap/dist/js/bootstrap.min.js
//= ../../bower_components/Snap.svg/dist/snap.svg-min.js
//= ../../bower_components/isInViewport/lib/isInViewport.min.js
//= ../../bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js

//= partials/modernizr.custom.js
//= partials/jquery.smoothWheel.js

(function ($) {
    $.fn.rotationDegrees = function () {
        var matrix = this.css("-webkit-transform") ||
            this.css("-moz-transform")    ||
            this.css("-ms-transform")     ||
            this.css("-o-transform")      ||
            this.css("transform");
        if(typeof matrix === 'string' && matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return angle;
    };
}(jQuery));

(function($) {
    "use strict";

    // animation show elements ---------------------------------------------------------------------------------------

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    // svg loader ------------------------------------------------------------------------------------------------------

    var svgLoader = $('#mask');
    var svgWidth = svgLoader.width();
    var svgHeight = svgLoader.height();
    var negativeML = -(svgWidth/2);  // отрицатильный отсуп слева
    var negativeMT = -(svgHeight/2); // отрицатильный отсуп сверху

    svgLoader.css({
        'marginLeft': negativeML,
        'marginTop': negativeMT
    });

    $('body').addClass('loaded');

    $(window).load(function() {

        setTimeout(function() {

            new Vivus('mask', {
                type: 'oneByOne',
                duration: 300
            }, function () {
                $('.loader').fadeOut(500);

                // first show visible elements
                $( '.navbar' ).isInViewport().animateCss('slideInDown');

                $('.main-frame').isInViewport().animateCss('fadeInUp');
                $('.catalog-row .description').isInViewport().animateCss('fadeInRight');
                $('.catalog-img').isInViewport().animateCss('fadeInUp');
                $('.catalog-text').isInViewport().animateCss('fadeInRight');
                $('.m-object-wrapper').isInViewport().addClass('animated fadeInUp');
                $('.text-wrapper').isInViewport().addClass('animated fadeInLeft');
            });

        }, 1000);
    });

    $('body').scroll(function() {
        $('.m-object-wrapper').isInViewport().addClass('animated fadeInUp');
        $('.stream-wrapper .row-content:nth-child(odd) .text-wrapper').isInViewport().addClass('animated fadeInLeft');
        $('.stream-wrapper .row-content:nth-child(even) .text-wrapper').isInViewport().addClass('animated fadeInRight');

        // $('[class*="sg-"]').isInViewport({ tolerance: -250 }).addClass('play');

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('[class*="sg-"]').isInViewport({ tolerance: -250 }).addClass('play ').one(animationEnd, function() {
            $(this).addClass('fa ');
        });
    });



    // $('[class*="sg-"]:in-viewport( -250 )').addClass('play');

    // $('[class*="sg-"]').isInViewport({ tolerance: -250 }).addClass('play');

    // $( '.sg-1' ).isInViewport({ tolerance: 100 }).css( 'background-color', 'red' );

    // $('[class*="sg-"]').hover(function () {
    //     // $(this).animateCss('hover');
    // });

    // $('[class*="sg-"]').hover(
    //     function(){
    //         $(this).animateCss('hover');
    //     },
    //     function(){
    //         $(this).removeClass('hover');
    //     });


    // hamburger btn ---------------------------------------------------------------------------------------------------

    var mobileBtn = $('.nav-toggle');
    var navMenu = $('.nav-menu');

    mobileBtn.click(function () {
        $(this).toggleClass('is-active');
        navMenu.toggleClass('is-active');
    });

    $('.toggle-btn').click(function(){
        $(this).toggleClass('open');
    });

    // smooth page scroll ----------------------------------------------------------------------------------------------

    $.event.props.push("wheelDelta");
    $.easing.easeOutQuint = function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    var docH = $(document).height() - $(window).height(),
        scrollTop = $(window).scrollTop();

    $(document).on("DOMMouseScroll mousewheel", function (e, delta) {

        // clamp the scroll offset
        scrollTop = Math.min(docH, Math.max(0, scrollTop - (delta || e.wheelDelta)));

        $("body, html").stop().animate({
            scrollTop: scrollTop
        }, 1000, "easeOutQuint");

        e.preventDefault();
    });

    // polymer click effect --------------------------------------------------------------------------------------------

    var parent, ink, d, x, y;
    $("ul li a.nav-link").click(function(e){
        parent = $(this).parent();
        //create .ink element if it doesn't exist
        if(parent.find(".ink").length == 0)
            parent.prepend("<span class='ink'></span>");

        ink = parent.find(".ink");
        //incase of quick double clicks stop the previous animation
        ink.removeClass("animate");

        //set size of .ink
        if(!ink.height() && !ink.width())
        {
            //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(parent.outerWidth(), parent.outerHeight());
            ink.css({height: d, width: d});
        }

        //get click coordinates
        //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - parent.offset().left - ink.width()/2;
        y = e.pageY - parent.offset().top - ink.height()/2;

        //set the position and add class .animate
        ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    });

    // media block shadow ----------------------------------------------------------------------------------------------

    var oH, oW, wMr, wMl, wW, mR, // object height, object width, wrapper marin right, wrapper marin left, wrapper width, margin right
        sH, sW, // shadow height, shadow width
        streamWrapper, // .stream-wrapper
        mObjectWrapper, mObject, mShadow, windowWidth;

    windowWidth = $(window).width();

    streamWrapper = $('.stream-wrapper');

    function shadowSize() {
        streamWrapper.each(function () {

            var row = $(this).find('.row');

            row.each(function(i, el) {
                mObjectWrapper = $(this).find('.m-object-wrapper');

                mObject = mObjectWrapper.find('.m-object');
                mShadow = mObjectWrapper.find('.m-shadow');

                oH = mObject.height();
                oW = mObject.width();
                wW = mObjectWrapper.width();

                mR = wW-oW;

                if(windowWidth < 992) {

                    if (i % 2 === 0) {
                        /* we are odd */

                        wMr = parseFloat(mObjectWrapper.css('margin-right'));
                        mShadow.css({
                            'margin-right': -(wMr)+5+'px',
                            'height': oH+'px'
                        })

                    } else {
                        /* we are even */

                        wMl = parseFloat(mObjectWrapper.css('margin-left'));
                        mShadow.css({
                            'margin-left': -(wMl)+5+'px',
                            'margin-right': mR+3+'px',
                            'height': oH+'px'
                        })

                    }
                } else {

                    if (i % 2 === 0) {
                        /* we are odd */

                        wMr = parseFloat(mObjectWrapper.css('margin-right'));
                        mShadow.css({
                            'margin-right': -(wMr)+45+'px',
                            'height': oH+'px'
                        })

                    } else {
                        /* we are even */

                        wMl = parseFloat(mObjectWrapper.css('margin-left'));
                        mShadow.css({
                            'margin-left': -(wMl)+'px',
                            'margin-right': mR+3+'px',
                            'height': oH+'px'
                        })
                    }
                }

            });

        });
    }

    shadowSize();

    $(window).resize(function () {
        shadowSize()
    });

    // svg string ------------------------------------------------------------------------------------------------------

    // var s = Snap("#string");
    //
    // Snap.load("img/string.svg", function(f) {
    //
    //     setTimeout(function () {
    //         shadowSize();
    //     }, 1000);
    //
    //     console.log('loaded');
    //
    //     var string1 = f.select(".path-10");
    //     var string2 = f.select(".path-15");
    //     var string3 = f.select(".path-20");
    //     var string4 = f.select(".path-25");
    //     var string5 = f.select(".path-30");
    //
    //     var string1box = f.select(".string1box");
    //     var string2box = f.select(".string2box");
    //     var string3box = f.select(".string3box");
    //     var string4box = f.select(".string4box");
    //     var string5box = f.select(".string5box");
    //
    //     string1box.hover(function() {
    //             string1.animate({d: 'M 63 0 C 38 195 88 195 63 390'}, 200, mina.elastic);
    //         },
    //         function(){
    //             string1.animate({d: 'M 63 0 L 63 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string2box.hover(function() {
    //             string2.animate({d: 'M 137 0 C 112 195 162 195 137 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string2.animate({d: 'M 137 0 L 137 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string3box.hover(function() {
    //             string3.animate({d: 'M 211 0 C 186 195 236 195 211 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string3.animate({d: 'M 211 0 L 211 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string4box.hover(function() {
    //             string4.animate({d: 'M 281 0 C 256 195 306 195 281 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string4.animate({d: 'M 281 0 L 281 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string5box.hover(function() {
    //             string5.animate({d: 'M 355 0 C 330 195 380 195 355 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string5.animate({d: 'M 355 0 L 355 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     s.append(f);
    // });
    //
    // $(document).click(function () {
    //
    //     // $('.navbar:in-viewport').animateCss('slideInDown');
    //
    //
    //
    //     // $('.catalog-row .description').animateCss('fadeInRight');
    //     // $('.catalog-img').animateCss('fadeInUp');
    //     // $('.main-frame').animateCss('fadeInUp');
    //     // $('.catalog-text').animateCss('fadeInRight');
    //     // $('.m-object-wrapper').animateCss('fadeInUp');
    //     // $('.stream-wrapper .row-content:nth-child(odd) .m-object-wrapper .rotate-text').animateCss('fadeInRight');
    //     // $('.stream-wrapper .row-content:nth-child(even) .m-object-wrapper .rotate-text').animateCss('fadeInLeft');
    // })


    // right panel -----------------------------------------------------------------------------------------------------

    // $('#slide-panel').show("slide", { direction: "right" }, 1000, function () {
    //     //Do what you want when the animation is finished.
    // });


    jQuery.fn.animateAuto = function(prop, speed, callback){
        var elem, height, width;
        return this.each(function(i, el){
            el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
            height = elem.css("height"),
                width = elem.css("width"),
                elem.remove();

            if(prop === "height")
                el.animate({"height":height}, speed, callback);
            else if(prop === "width")
                el.animate({"width":width}, speed, callback);
            else if(prop === "both")
                el.animate({"width":width,"height":height}, speed, callback);
        });
    }

    // $('.slide-btn').mouseenter(function() {
    $('.slide-btn').hover(function() {
        // $(this).parent().addClass('open');
        $(this).parent().toggleClass('open');

        // $(this).animateAuto("width", 500);

        $('.slide-panel-items').mCustomScrollbar({
            theme:"right-arrows"
        });
    });

})(jQuery);

$(function() {

    // -----------
    // Debugger that shows view port size. Helps when making responsive designs.
    // -----------
    function showViewPortSize(display) {
        if(display) {
            var height = window.innerHeight;
            var width = window.innerWidth;
            jQuery('body').prepend('<div id="viewportsize" style="z-index:9999;position:fixed;bottom:0px;left:0px;color:#fff;background:#000;padding:10px">Height: '+height+'<br>Width: '+width+'</div>');
            jQuery(window).resize(function() {
                height = window.innerHeight;
                width = window.innerWidth;
                jQuery('#viewportsize').html('Height: '+height+'<br>Width: '+width);
            });
        }
    }

    // $(document).ready(function(){
    //     showViewPortSize(true);
    // });

});