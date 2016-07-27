(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.bootstrap();
            utils.customJS();
            utils.matchHeight();
        }
    });

    window.Utils = Class.extend({
        init:function(){},

        bootstrap:function(){
            function isTouchDevice(){
                return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
            }
            if(isTouchDevice()===false) {
                $('[data-toggle="tooltip"]').tooltip();
            }

        },

        customJS:function(){
            $( document ).ready(function() {

                scaleVideoContainer();

                initBannerVideoSize('.video-container .poster img');
                initBannerVideoSize('.video-container .filter');
                initBannerVideoSize('.video-container video');

                $(window).on('resize', function() {
                    scaleVideoContainer();
                    scaleBannerVideoSize('.video-container .poster img');
                    scaleBannerVideoSize('.video-container .filter');
                    scaleBannerVideoSize('.video-container video');
                });

            });

            function scaleVideoContainer() {

                var height = $(window).height();
                var unitHeight = parseInt(height) + 'px';
                $('.homepage-hero-module').css('height',unitHeight);

            }

            function initBannerVideoSize(element){

                $(element).each(function(){
                    $(this).data('height', $(this).height());
                    $(this).data('width', $(this).width());
                });

                scaleBannerVideoSize(element);

            }

            function scaleBannerVideoSize(element){

                var windowWidth = $(window).width(),
                    windowHeight = $(window).height(),
                    videoWidth,
                    videoHeight;

                //console.log(windowHeight);

                $(element).each(function(){
                    var videoAspectRatio = $(this).data('height')/$(this).data('width');

                    $(this).width(windowWidth);

                    if(windowWidth < 1000){
                        videoHeight = windowHeight;
                        videoWidth = videoHeight / videoAspectRatio;
                        $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

                        $(this).width(videoWidth).height(videoHeight);
                    }

                    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

                });
            }

            //$('#scene').parallax({
            //    calibrateX: true,
            //    calibrateY: true,
            //    invertX: false,
            //    invertY: true,
            //    limitX: false,
            //    limitY: 10,
            //    scalarX: 2,
            //    scalarY: 8,
            //    frictionX: 0.2,
            //    frictionY: 0.8,
            //    originX: 0.0,
            //    originY: 1.0
            //});

        },
        matchHeight:function(){
            //$('.promo-slider .p-item').matchHeight();
            //$('.selection-tower-crane .spare-parts-crane .s-item').matchHeight();
        }
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);
$(function() {
    //jQuery is required to run this code

});



