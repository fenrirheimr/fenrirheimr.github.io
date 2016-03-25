
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
            utils.tagCloud();
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

            $('.header').affix({
                offset: 30
            });

            var windowsWidth = $(window).width();

            if(windowsWidth >= 1200) { // то нужно потом ввернуть
                var pageWrapper = $('.page-wrapper');
                var footerHeight = $('.footer').outerHeight()-56;
                // TODO: хз откуда вылазят эти 56 пикселей надо будет найти

                console.log(footerHeight)

                pageWrapper.css('marginBottom', footerHeight);
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
                offset: 90
            });

            $('.material input, .material textarea').blur(function() {
                var $this = $(this);
                if ($this.val())
                    $this.addClass('used');
                else
                    $this.removeClass('used');
            });

            $('textarea').autosize();

            $('select').selectbox({
                onOpen: function (inst) {
                    //firstRow.hide();
                },
                onClose: function (inst) {
                    //firstRow.show();
                },
                effect: "slide"
            });

            var $root = $('html, body');
            $('.promo-caption .more').click(function() {
                var href = $.attr(this, 'href');
                $root.animate({
                    scrollTop: $(href).offset().top
                }, 500, function () {
                    window.location.hash = href;
                });
                return false;
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

            var equalBlogCaption = $('.blog-entry .caption');
            equalBlogCaption.matchHeight();

            var equalBlogText = $('.blog-entry .text');
            equalBlogText.matchHeight();

            var equalMassMedia = $('.mass-media .row > div');
            equalMassMedia.matchHeight();
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
                slideMargin: 0,
                adaptiveHeight: true
            });
        },
        tagCloud:function(){
            var words = [
                {text: "Управление", weight: 13, link: 'tag.html'},
                {text: "Lorem", weight: 13, link: 'tag.html'},
                {text: "Маркетинг", weight: 9.5, link: 'tag.html'},
                {text: "Ipsum", weight: 10.5, link: 'tag.html'},
                {text: "Инструменты", weight: 7.4, link: 'tag.html'},
                {text: "Dolor", weight: 9.4, link: 'tag.html'},
                {text: "Менеджмент", weight: 8, link: 'tag.html'},
                {text: "PR-стратегии", weight: 10, link: 'tag.html'},
                {text: "Sit", weight: 8, link: 'tag.html'},
                {text: "Amet", weight: 6.2, link: 'tag.html'},
                {text: "Consectetur", weight: 5, link: 'tag.html'},
                {text: "Adipiscing", weight: 5, link: 'tag.html'},
                {text: "Менеджмент", weight: 5, link: 'tag.html'},
                {text: "Управление", weight: 13, link: 'tag.html'},
                {text: "Управление", weight: 13, link: 'tag.html'},
                {text: "Lorem", weight: 13, link: 'tag.html'},
                {text: "Маркетинг", weight: 9.5, link: 'tag.html'},
                {text: "Ipsum", weight: 10.5, link: 'tag.html'},
                {text: "Инструменты", weight: 7.4, link: 'tag.html'},
                {text: "Dolor", weight: 9.4, link: 'tag.html'},
                {text: "Менеджмент", weight: 8, link: 'tag.html'},
                {text: "PR-стратегии", weight: 10, link: 'tag.html'},
                {text: "Sit", weight: 8, link: 'tag.html'},
                {text: "Amet", weight: 6.2, link: 'tag.html'},
                {text: "Consectetur", weight: 5, link: 'tag.html'},
                {text: "Adipiscing", weight: 5, link: 'tag.html'},
                {text: "Менеджмент", weight: 5, link: 'tag.html'},
                {text: "Управление", weight: 13, link: 'tag.html'}
            ];

            $('.tag-wrapper').jQCloud(words, {
                height: 400
            });
        }
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);