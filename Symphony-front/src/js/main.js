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
    })

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