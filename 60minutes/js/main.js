
(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.validateForm();
            utils.burgerBtn();
            utils.bootstrap();
            utils.equalHeight();
            utils.sliderOnMain();
            utils.collapseFooterNav();
            utils.phoneMask();
            utils.customFile();
            utils.collapseLinkText();
            utils.autoPlayYouTubeModal();
            utils.productCarousel();
            utils.scrollToYear();
        }
    });

    window.Utils = Class.extend({
        init:function(){},

        sliderOnMain: function(){
            $('.gallery .bxslider').bxSlider({
                mode: 'fade',
                pager: false
            });
        },
        bootstrap:function(){
            function isTouchDevice(){
                return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
            }
            if(isTouchDevice()===false) {
                $('[data-toggle="tooltip"]').tooltip();
            }


        },
        equalHeight:function(){
            var equalBlock = $('[class^=col-] .block');
            equalBlock.matchHeight();

            var equalBrand = $('.our-brands [class^=col-]');
            equalBrand.matchHeight();

            var brandblockHeight = equalBrand.height();
            equalBrand.css('line-height', brandblockHeight + 'px');

            var equalCategory = $('.category-wrapper [class^=col-] .category-item');
            equalCategory.matchHeight();

            var equalFeature = $('.category-wrapper .feature-wrapper .feature-item');
            equalFeature.matchHeight();

            var equalShopLlist = $('.shop-list .row > div');
            equalShopLlist.matchHeight();

            var equalPartners = $('.row .inner');
            equalPartners.matchHeight();
            var equalPartnersP = $('.promo p');
            equalPartnersP.matchHeight();
        },
        validateForm:function(){

            $('#callback form').validate({

                errorClass: "error",
                rules : {
                    uname: {
                        required : true
                    },
                    tel: {
                        required : true
                    }
                },
                highlight: function(element, errorClass, showErrors) {
                    $(element).parent().addClass(errorClass);
                    $(".error-mess").text('Заполните все поля!');
                },
                unhighlight: function(element, errorClass, showErrors) {
                    $(element).parent().removeClass(errorClass);
                    $(".error-mess").text('');
                },
                errorPlacement: function(error,element) {}

            });

            $('#example form').validate({

                errorClass: "error",
                rules : {
                    uname: {
                        required : true
                    },
                    tel: {
                        required : true
                    },
                    addr: {
                        required : true
                    },
                    company: {
                        required : true
                    }
                },
                highlight: function(element, errorClass, showErrors) {
                    $(element).parent().addClass(errorClass);
                    $(".error-mess").text('Заполните все поля!');
                },
                unhighlight: function(element, errorClass, showErrors) {
                    $(element).parent().removeClass(errorClass);
                    $(".error-mess").text('');
                },
                errorPlacement: function(error,element) {}

            });

        },

        burgerBtn:function(){
            var toggles = document.querySelectorAll(".c-hamburger");

            for (var i = toggles.length - 1; i >= 0; i--) {
                var toggle = toggles[i];
                toggleHandler(toggle);
            };

            function toggleHandler(toggle) {
                toggle.addEventListener( "click", function(e) {
                    e.preventDefault();
                    (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
                });
            };
        },
        collapseFooterNav:function(){
            var windowWidth = $(window).width();

            //console.log(windowWidth)

            if(windowWidth <= 980) {
                var collapseLink = $('.footer .nav .caption');

                collapseLink.click(function(e){
                    e.preventDefault();
                    $(this).next().slideToggle();
                    $(this).parent().siblings().find('ul').slideUp();
                });
            }
        },
        phoneMask:function(){
            var phoneInput = $('input[type="tel"]');
            phoneInput.mask('+7 (999) 999-9999');
        },
        collapseLinkText:function(){
            $('.collapse-link').click(function(){
                //$(this).text(function(i,old){
                //    return old=='подробнее о вакансии' ?  'скрыть' : 'подробнее о вакансии';
                //});

                if ($(this).text() == 'подробнее о вакансии') {
                    $(this).text('скрыть');
                } else {
                    $(this).text('подробнее о вакансии');
                }
            });
        },
        autoPlayYouTubeModal:function(){
            var trigger = $("body").find('[data-toggle="modal"]');
            trigger.click(function() {
                var theModal = $(this).data( "target" ),
                    videoSRC = $(this).attr( "data-theVideo" ),
                    videoSRCauto = videoSRC+"?autoplay=1" ;
                $(theModal+' iframe').attr('src', videoSRCauto);
                $(theModal+' button.close').click(function () {
                    $(theModal+' iframe').attr('src', videoSRC);
                });
            });
        },
        customFile:function(){
            $(document).on('change', '.btn-file :file', function() {
                var input = $(this),
                    numFiles = input.get(0).files ? input.get(0).files.length : 1,
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [numFiles, label]);
            });

            $(document).ready( function() {
                $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

                    var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;

                    if( input.length ) {
                        input.val(log);
                    } else {
                        if( log ) alert(log);
                    }

                });
            });
        },
        productCarousel:function(){
            $('#carousel').flexslider({
                animation: "slide",
                controlNav: false,
                directionNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 120,
                itemMargin: 25,
                asNavFor: '#slider'
            });

            $('#slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#carousel"
            });
        },
        scrollToYear:function(){
            $('.history .years li a').click(function(e){
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
                }, "slow");
            });
            $(".gototop").click(function(e) {
                e.preventDefault();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            });
        }


    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);