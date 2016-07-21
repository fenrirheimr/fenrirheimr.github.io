(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.bootstrap();
            utils.customJS();
            utils.matchHeight();
            utils.bxSlider();
            utils.customSelect();
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

        },
        matchHeight:function(){
            $('.promo-slider .p-item').matchHeight();
            $('.selection-tower-crane .spare-parts-crane .s-item').matchHeight();
        },

        customSelect:function(){
            $('.form-group select').selectbox();
        },

        bxSlider:function(){
            var slider = $('.promo-slider').bxSlider({
                slideWidth: 230,
                minSlides: 4,
                maxSlides: 4,
                moveSlides: 1,
                slideMargin: 10,
                pager: 'true'
            });

            $('.news .news-slider').bxSlider({
                slideWidth: 240,
                minSlides: 2,
                maxSlides: 3,
                moveSlides: 1,
                slideMargin: 10,
                pager: false
            });

            $('.popular-slider').bxSlider({
                slideWidth: 226,
                minSlides: 2,
                maxSlides: 4,
                moveSlides: 1,
                slideMargin: 10,
                pager: false
            });

            $('.tower-crane-slider').bxSlider({
                slideWidth: 282,
                minSlides: 1,
                maxSlides: 2,
                moveSlides: 1,
                controls: false,
                pagerCustom: '#tower-crane-pager'
            });
        }
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);