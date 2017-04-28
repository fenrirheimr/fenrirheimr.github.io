//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/vivus/dist/vivus.min.js
//= ../../bower_components/bootstrap/dist/js/bootstrap.min.js
//= partials/modernizr.custom.js


(function($) {
    "use strict";

    var mobileBtn = $('.nav-toggle');
    var navMenu = $('.nav-menu');

    mobileBtn.click(function () {
        $(this).toggleClass('is-active');
        navMenu.toggleClass('is-active');
    });

    var svgLoader = $('#mask');
    var svgWidth = svgLoader.width();
    var svgHeight = svgLoader.height();
    var nergativeML = -(svgWidth/2);  // отрицатильным отсуп слева
    var nergativeMT = -(svgHeight/2); // отрицатильным отсуп сверху

    svgLoader.css({
        'marginLeft': nergativeML,
        'marginTop': nergativeMT
    });

    $(window).load(function() {

        setTimeout(function() {
            $('body').addClass('loaded');

            new Vivus('mask', {
                type: 'oneByOne',
                duration: 300
            }, function () {
                $('.loader').fadeOut(300);
            });

        }, 1000)
    });

    $('.toggle-btn').click(function(){
        $(this).toggleClass('open');
    });

    // polymer click effect

    //jQuery time
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

    // media block shadow

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

                console.log(mR);
                if(windowWidth < 992) {
                    console.log('1');
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
                    console.log('2');
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

})(jQuery);

$(function() {

    // function showViewPortSize(display) {
    //     if(display) {
    //         var height = jQuery(window).height();
    //         var width = jQuery(window).width();
    //         jQuery('body').prepend('<div id="viewportsize" style="z-index:9999;position:fixed;top:40px;left:5px;color:#fff;background:#000;padding:10px">Height: '+height+'<br>Width: '+width+'</div>');
    //         jQuery(window).resize(function() {
    //             height = jQuery(window).height();
    //             width = jQuery(window).width();
    //             jQuery('#viewportsize').html('Height: '+height+'<br>Width: '+width);
    //         });
    //     }
    // }
    //
    // showViewPortSize(true);

});