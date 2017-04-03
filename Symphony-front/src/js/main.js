//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/walkway/walkway.min.js
//= ../../bower_components/vivus/dist/vivus.min.js
//= partials/modernizr.custom.js


(function($) {
    "use strict";

    var mobileBtn = $('.nav-toggle');
    var navMenu = $('.nav-menu');

    mobileBtn.click(function () {
        $(this).toggleClass('is-active');
        navMenu.toggleClass('is-active');
    });

    new Vivus('mask', {duration: 50});

    // new Vivus('mask', {}, function (obj) {
    //     obj.el.classList.add('finished');
    // });

    // var svg = new Walkway('#loader');
    //
    // svg.draw(function() {
    //     console.log('Animation finished');
    // });

    // var loaderWrapp = $('#mask');
    // var letter = loaderWrapp.find('.letter');
    //
    // loaderWrapp.each(function () {
    //     letter.fadeIn();
    // })



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