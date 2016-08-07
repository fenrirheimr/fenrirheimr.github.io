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

            var catalogItem = $('.catalog .catalog-item');

            catalogItem.hover(
                function () {
                    var catalogItemBtn = $(this).find('.btn-blue');
                    catalogItemBtn.toggleClass('btn-blue btn-yellow');
                },//при наведении курсора на элемент
                function () {
                    var catalogItemBtn = $(this).find('.btn-yellow');
                    catalogItemBtn.toggleClass('btn-yellow btn-blue');
                } //при уводе курсора с элемента
            );

            $(".fancybox").fancybox();

            $(window).load(function() {
                var contentSlideWidth = []

                var windowWidth = $(window).width();
                if (windowWidth<992) {
                    contentSlideWidth = 210;
                    console.log('< 992')
                } else {
                    contentSlideWidth = 220;
                    console.log('> 1000')
                }

                if (windowWidth>1000) {
                    contentSlideWidth = 227.5;
                    console.log('> 1000')
                }

                $('#carousel').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    itemWidth: contentSlideWidth,
                    itemMargin: 10,
                    asNavFor: '#slider'
                });

                $('#slider').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    sync: "#carousel"
                });
            });
        },
        matchHeight:function(){
            $('.promo-slider .p-item').matchHeight();
            $('.selection-tower-crane .spare-parts-crane .s-item').matchHeight();
            $('.main-characteristics > div > div').matchHeight();
        },

        customSelect:function(){
            $('.form-group select').selectbox();
        },

        bxSlider:function(){

            $('.news .news-slider').bxSlider({
                slideWidth: 240,
                minSlides: 2,
                maxSlides: 3,
                moveSlides: 1,
                slideMargin: 10,
                pager: false
            });

            var windowWidth = $(window).width();
            var slideWidth = [];

            if (windowWidth>992) {
                slideWidth = 220;
                console.log('> 1000')
            } else if (windowWidth>1010) {
                slideWidth = 277;
                console.log('> 1000')
            } else {
                slideWidth = 227.5;
                console.log('< 1000')
            }

            $('.popular-slider').bxSlider({
                slideWidth: slideWidth,
                minSlides: 1,
                maxSlides: 4,
                moveSlides: 1,
                slideMargin: 10,
                pager: false
                //infiniteLoop: false
            });

            ////////////////////////////////////////////


            ////////////////////////////////////////////

            $('.tower-crane-slider').bxSlider({
                slideWidth: 290,
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