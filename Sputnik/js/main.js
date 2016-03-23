
(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.bootstrap();
            utils.customJS();
            utils.equalHeight();
            utils.hamburgerBtn();
            utils.bxSlider();
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

            var windowsWidth = $(window).width();

            if(windowsWidth >= 1200) { // то нужно потом ввернуть
                var pageWrapper = $('.page-wrapper');
                var footerHeight = $('.footer').outerHeight()-56;
                // TODO: хз откуда вылазят эти 56 пикселей надо будет найти

                console.log(footerHeight)

                pageWrapper.css('marginBottom', footerHeight);
            }

            var headerSection = $('.header-wrapper');
            var videoBlockHeight = headerSection.find('.promo-wrapper').height();
            headerSection.css('height', videoBlockHeight);

            $('section').addClass('hidden-block').viewportChecker({
                classToAdd: 'visible animated fadeIn',
                classToRemove:'hidden-block',
                offset: 100
            });

        },

        equalHeight:function(){
            var equalWhomItem = $('.whom .whom-item');
            equalWhomItem.matchHeight();

            var equalBlock = $('.blocks .row > div');
            equalBlock.matchHeight();

            var equalThumbs = $('.thumbnail .caption');
            equalThumbs.matchHeight();

            var equalTeamThumbs = $('.team .thumbnail > div');
            equalTeamThumbs.matchHeight();
        },
        hamburgerBtn:function(){

            var hamburgerBtn = $('.header .hamburger-btn');
            var nav = $('.header .navigation');

            hamburgerBtn.click(function(){
                $(this).toggleClass('open');
                nav.toggle();
            })

        },
        bxSlider:function(){
            $('.slider .slider-wrapper').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 1,
                slideMargin: 0
            });
        }
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);