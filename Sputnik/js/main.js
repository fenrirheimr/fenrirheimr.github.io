
(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.bootstrap();
            utils.customJS();
            utils.equalHeight();

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

            if(windowsWidth >= 1200) {
                var pageWrapper = $('.page-wrapper');
                var footerHeight = $('.footer').outerHeight();
                pageWrapper.css('marginBottom', footerHeight);
            }

            var headerSection = $('.header-wrapper');
            var videoBlockHeight = headerSection.find('video').height();
            headerSection.height(videoBlockHeight)

        },

        equalHeight:function(){
            var equalBlock = $('.modal label');
            equalBlock.matchHeight();
        }
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);