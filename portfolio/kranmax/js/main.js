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
                // The slider being synced must be initialized first
                $('#carousel').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    //itemWidth: 229,
                    itemWidth: 277,
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

            $('.popular-slider').bxSlider({
                slideWidth: 277,
                minSlides: 1,
                maxSlides: 4,
                moveSlides: 1,
                slideMargin: 10,
                pager: false
            });

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