//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/vivus/dist/vivus.min.js
//= ../../bower_components/bootstrap/dist/js/bootstrap.min.js
//= ../../bower_components/Snap.svg/dist/snap.svg-min.js
//= ../../bower_components/isInViewport/lib/isInViewport.min.js
//= ../../bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js
//= ../../bower_components/bxslider-4/dist/jquery.bxslider.js

//= partials/modernizr.custom.js
//= partials/jquery.smoothWheel.js

(function ($) {
    $.fn.rotationDegrees = function () {
        var matrix = this.css("-webkit-transform") ||
            this.css("-moz-transform")    ||
            this.css("-ms-transform")     ||
            this.css("-o-transform")      ||
            this.css("transform");
        if(typeof matrix === 'string' && matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return angle;
    };
}(jQuery));

(function($) {
    "use strict";

    // animation show elements ---------------------------------------------------------------------------------------

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    // svg loader ------------------------------------------------------------------------------------------------------

    var svgLoader = $('#mask');
    var svgWidth = svgLoader.width();
    var svgHeight = svgLoader.height();
    var negativeML = -(svgWidth/2);  // отрицатильный отсуп слева
    var negativeMT = -(svgHeight/2); // отрицатильный отсуп сверху

    svgLoader.css({
        'marginLeft': negativeML,
        'marginTop': negativeMT
    });

    $('body').addClass('loaded');

    $(window).load(function() {

        setTimeout(function() {

            new Vivus('mask', {
                type: 'oneByOne',
                duration: 300
            }, function () {
                $('.loader').fadeOut(500);

                // first show visible elements
                $( '.navbar' ).isInViewport().animateCss('slideInDown');

                $('.main-frame').isInViewport().animateCss('fadeInUp');
                $('.catalog-row .description').isInViewport().animateCss('fadeInRight');
                $('.catalog-img').isInViewport().animateCss('fadeInUp');
                $('.catalog-text').isInViewport().animateCss('fadeInRight');
                $('.m-object-wrapper').isInViewport().addClass('animated fadeInUp');
                $('.text-wrapper').isInViewport().addClass('animated fadeInLeft');
            });

        }, 1000);
    });

    // var myTween = new TweenMax.staggerTo(".obj", 1, {rotation:360,x: -500, y: 500,opacity:1}, 0.5);

    // var myTween = new TimelineLite({ paused: true });
    // TweenMax.staggerTo(".obj", 1, {rotation: 270, x: -500, y: 500, opacity: 1}, 0.5);
    // myTween.play();



    //------------------------------------------------------------------------------------------------------------------

    // /*global TweenMax, TimelineMax,Power2*/
    // var myDIVs = document.querySelectorAll('.obj'),
    //     numDIVs = myDIVs.length;
    // var timeline = new TimelineMax({
    //         paused: true
    //     }),
    //     duration = .4,
    //     ease = Power2.easeOut,
    //     staggerFactor = .1,
    //     scrollTweenDuration = .4;
    // var scrollTimeout = null,
    //     scrollTimeoutDelay = 20,
    //     currentScrollProgress = 0;
    // var maxScroll = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight; //see [http://stackoverflow.com/a/17698713/3344111]
    //
    // function initTimeline() {
    //     for (var i = 0; i < numDIVs; i += 1) {
    //         timeline.fromTo(myDIVs[i], duration, {
    //             opacity: 0
    //         }, {
    //             opacity: 1,
    //             ease: ease,
    //             rotation: 270,
    //             x: -500,
    //             y: 500
    //         }, i * staggerFactor);
    //     }
    // }
    //
    // function listenToScrollEvent() {
    //     (window.addEventListener) ? window.addEventListener('scroll', debounceScroll, false) : window.attachEvent('onscroll', debounceScroll);
    // }
    //
    // function debounceScroll() {
    //     clearTimeout(scrollTimeout);
    //     scrollTimeout = setTimeout(onScroll, scrollTimeoutDelay);
    // }
    //
    // function onScroll() {
    //     currentScrollProgress = roundDecimal(window.scrollY / maxScroll, 4);
    //     //timeline.progress(currentScrollProgress); // either directly set the [progress] of the timeline which may produce a rather jumpy result
    //     TweenMax.to(timeline, scrollTweenDuration, {
    //         progress: currentScrollProgress,
    //         ease: ease
    //     }); // or tween the [timeline] itself to produce a transition from one state to another i.e. it looks smooth
    // }
    //
    // function roundDecimal(value, place) {
    //     return Math.round(value * Math.pow(10, place)) / Math.pow(10, place);
    // }
    //
    // function initObj() {
    //     initTimeline();
    //     listenToScrollEvent();
    // }
    //
    // initObj();
    //
    // console.log(maxScroll, numDIVs)

    //------------------------------------------------------------------------------------------------------------------

    $('body').scroll(function() {
        $('.m-object-wrapper').isInViewport().addClass('animated fadeInUp');
        $('.stream-wrapper .row-content:nth-child(odd) .text-wrapper').isInViewport().addClass('animated fadeInLeft');
        $('.stream-wrapper .row-content:nth-child(even) .text-wrapper').isInViewport().addClass('animated fadeInRight');

        // $('[class*="sg-"]').isInViewport({ tolerance: -250 }).addClass('play');

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('[class*="sg-"]').isInViewport({ tolerance: -50 }).addClass('play ').one(animationEnd, function() {
            $(this).addClass('fa ');
        });

        // var objLeft = $('.obj').offset().left;
        // var objTop = $('.obj').offset().top;

        // myTween.staggerTo(".obj", 1, {rotation: 270, x: -500, y: 500}, 0.5);

        // myTween.set(".obj", {clearProps:"left"});
        // myTween.set(".obj", {clearProps:"top"});

        // TweenMax.staggerTo(".obj", 1, {rotation: 270, x: -500, y: 500, opacity: 1}, 0.5);

        console.log('scroll');
    });





    // $('[class*="sg-"]:in-viewport( -250 )').addClass('play');

    // $('[class*="sg-"]').isInViewport({ tolerance: -250 }).addClass('play');

    // $( '.sg-1' ).isInViewport({ tolerance: 100 }).css( 'background-color', 'red' );

    // $('[class*="sg-"]').hover(function () {
    //     // $(this).animateCss('hover');
    // });

    // $('[class*="sg-"]').hover(
    //     function(){
    //         $(this).animateCss('hover');
    //     },
    //     function(){
    //         $(this).removeClass('hover');
    //     });


    // hamburger btn ---------------------------------------------------------------------------------------------------

    var mobileBtn = $('.nav-toggle');
    var navMenu = $('.nav-menu');

    mobileBtn.click(function () {
        $(this).toggleClass('is-active');
        navMenu.toggleClass('is-active');
    });

    $('.toggle-btn').click(function(){
        $(this).toggleClass('open');
    });

    // smooth page scroll ----------------------------------------------------------------------------------------------

    // $.event.props.push("wheelDelta");
    // $.easing.easeOutQuint = function (x, t, b, c, d) {
    //     return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    // };
    //
    // var docH = $(document).height() - $(window).height(),
    //     scrollTop = $(window).scrollTop();
    //
    // $(document).on("DOMMouseScroll mousewheel", function (e, delta) {
    //
    //     // clamp the scroll offset
    //     scrollTop = Math.min(docH, Math.max(0, scrollTop - (delta || e.wheelDelta)));
    //
    //     $("body, html").stop().animate({
    //         scrollTop: scrollTop
    //     }, 1000, "easeOutQuint");
    //
    //     e.preventDefault();
    // });

    // polymer click effect --------------------------------------------------------------------------------------------

    var parent, ink, d, x, y;
    $("ul li a.nav-link").click(function(e){
        parent = $(this).parent();
        //create .ink element if it doesn't exist
        if(parent.find(".ink").length == 0)
            parent.prepend("<span class='ink'></span>");

        ink = parent.find(".ink");
        //incase of quick double clicks stop the previous animation
        ink.removeClass("animate");

        //set size of .ink
        if(!ink.height() && !ink.width())
        {
            //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(parent.outerWidth(), parent.outerHeight());
            ink.css({height: d, width: d});
        }

        //get click coordinates
        //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - parent.offset().left - ink.width()/2;
        y = e.pageY - parent.offset().top - ink.height()/2;

        //set the position and add class .animate
        ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    });

    // media block shadow ----------------------------------------------------------------------------------------------

    var oH, oW, wMr, wMl, wW, mR, // object height, object width, wrapper marin right, wrapper marin left, wrapper width, margin right
        sH, sW, // shadow height, shadow width
        streamWrapper, // .stream-wrapper
        mObjectWrapper, mObject, mShadow, windowWidth;

    windowWidth = $(window).width();

    streamWrapper = $('.stream-wrapper');

    function shadowSize() {
        streamWrapper.each(function () {

            var row = $(this).find('.row');

            row.each(function(i, el) {
                mObjectWrapper = $(this).find('.m-object-wrapper');

                mObject = mObjectWrapper.find('.m-object');
                mShadow = mObjectWrapper.find('.m-shadow');

                oH = mObject.height();
                oW = mObject.width();
                wW = mObjectWrapper.width();

                mR = wW-oW;

                if(windowWidth < 992) {

                    if (i % 2 === 0) {
                        /* we are odd */

                        wMr = parseFloat(mObjectWrapper.css('margin-right'));
                        mShadow.css({
                            'margin-right': -(wMr)+5+'px',
                            'height': oH+'px'
                        })

                    } else {
                        /* we are even */

                        wMl = parseFloat(mObjectWrapper.css('margin-left'));
                        mShadow.css({
                            'margin-left': -(wMl)+5+'px',
                            'margin-right': mR+3+'px',
                            'height': oH+'px'
                        })

                    }
                } else {

                    if (i % 2 === 0) {
                        /* we are odd */

                        wMr = parseFloat(mObjectWrapper.css('margin-right'));
                        mShadow.css({
                            'margin-right': -(wMr)+45+'px',
                            'height': oH+'px'
                        })

                    } else {
                        /* we are even */

                        wMl = parseFloat(mObjectWrapper.css('margin-left'));
                        mShadow.css({
                            'margin-left': -(wMl+45)+'px',
                            'margin-right': mR+3+'px',
                            'height': oH+'px'
                        })
                    }
                }

                var outFrameWrapper = $(this).eq(i).find('.out-frame-wrapper');

                // console.log(outFrameWrapper.length);

                outFrameWrapper.each(function(i) {
                    var outFrame = $(this).eq(i).find('.out-frame');
                    var outFrameShadow = $(this).eq(i).find('.out-frame-shadow');

                    var outFrameX = outFrame.eq(i).position().left;
                    var outFrameY = outFrame.eq(i).position().top;
                    var outFrameOffset = parseInt(outFrame.eq(i).css('transform').split(',')[4]);

                    var outFrameShadowWidth = outFrameShadow.outerWidth() - outFrameOffset;
                    var outFrameHeight = outFrame.outerHeight();
                    // var outFrameOffset = outFrame.css('transform');


                    outFrameShadow.eq(i).css({
                        top: outFrameY,
                        // left: outFrameX,
                        // right: -(outFrameOffset-23),
                        height: outFrameHeight
                    });

                    console.log(outFrameOffset);
                });

                // console.log(outFrameX, outFrameY);

            });

        });
    }

    shadowSize();

    $(window).resize(function () {
        shadowSize()
    });


    // svg string ------------------------------------------------------------------------------------------------------

    // var s = Snap("#string");
    //
    // Snap.load("img/string.svg", function(f) {
    //
    //     setTimeout(function () {
    //         shadowSize();
    //     }, 1000);
    //
    //     console.log('loaded');
    //
    //     var string1 = f.select(".path-10");
    //     var string2 = f.select(".path-15");
    //     var string3 = f.select(".path-20");
    //     var string4 = f.select(".path-25");
    //     var string5 = f.select(".path-30");
    //
    //     var string1box = f.select(".string1box");
    //     var string2box = f.select(".string2box");
    //     var string3box = f.select(".string3box");
    //     var string4box = f.select(".string4box");
    //     var string5box = f.select(".string5box");
    //
    //     string1box.hover(function() {
    //             string1.animate({d: 'M 63 0 C 38 195 88 195 63 390'}, 200, mina.elastic);
    //         },
    //         function(){
    //             string1.animate({d: 'M 63 0 L 63 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string2box.hover(function() {
    //             string2.animate({d: 'M 137 0 C 112 195 162 195 137 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string2.animate({d: 'M 137 0 L 137 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string3box.hover(function() {
    //             string3.animate({d: 'M 211 0 C 186 195 236 195 211 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string3.animate({d: 'M 211 0 L 211 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string4box.hover(function() {
    //             string4.animate({d: 'M 281 0 C 256 195 306 195 281 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string4.animate({d: 'M 281 0 L 281 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     string5box.hover(function() {
    //             string5.animate({d: 'M 355 0 C 330 195 380 195 355 390'}, 200, mina.elastic);
    //         },
    //         function() {
    //             string5.animate({d: 'M 355 0 L 355 390'}, 400, mina.elastic);
    //         }
    //     );
    //
    //     s.append(f);
    // });
    //
    // $(document).click(function () {
    //
    //     // $('.navbar:in-viewport').animateCss('slideInDown');
    //
    //
    //
    //     // $('.catalog-row .description').animateCss('fadeInRight');
    //     // $('.catalog-img').animateCss('fadeInUp');
    //     // $('.main-frame').animateCss('fadeInUp');
    //     // $('.catalog-text').animateCss('fadeInRight');
    //     // $('.m-object-wrapper').animateCss('fadeInUp');
    //     // $('.stream-wrapper .row-content:nth-child(odd) .m-object-wrapper .rotate-text').animateCss('fadeInRight');
    //     // $('.stream-wrapper .row-content:nth-child(even) .m-object-wrapper .rotate-text').animateCss('fadeInLeft');
    // })


    // right panel -----------------------------------------------------------------------------------------------------

    // $('#slide-panel').show("slide", { direction: "right" }, 1000, function () {
    //     //Do what you want when the animation is finished.
    // });


    jQuery.fn.animateAuto = function(prop, speed, callback){
        var elem, height, width;
        return this.each(function(i, el){
            el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
            height = elem.css("height"),
                width = elem.css("width"),
                elem.remove();

            if(prop === "height")
                el.animate({"height":height}, speed, callback);
            else if(prop === "width")
                el.animate({"width":width}, speed, callback);
            else if(prop === "both")
                el.animate({"width":width,"height":height}, speed, callback);
        });
    }

    // $('.slide-btn').mouseenter(function() {
    $('.slide-btn').hover(function() {
        // $(this).parent().addClass('open');
        $(this).parent().addClass('open');

        // $(this).animateAuto("width", 500);

        $('.slide-panel-items').mCustomScrollbar({
            theme:"right-arrows"
        });
    });
    $('.slide-panel').mouseleave(function() {
        $(this).removeClass('open');
    });

    //-------

    $('.catalog-tabs a').click(function (e) {
        e.preventDefault();
        var tab = $(this);

        if(tab.hasClass('active')){
            window.setTimeout(function(){
                $(".tab-pane").removeClass('active');
                tab.removeClass('active');
            },1);
        }

    });

    // var bg = $('.stream-wrapper.article');
    // var aw = $('.article-wrapper');
    // var awh = aw.outerHeight();
    //
    //
    // console.log(awh)
    // bg.height(awh);

    //------------------------------------------------------------------------------------------------------------------


    function init () {
        var myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 11
            }, {
                searchControlProvider: 'yandex#search'
            }),
            objectManager = new ymaps.ObjectManager({
                // Мы хотим загружать данные для балуна перед открытием, поэтому
                // запретим автоматически открывать балун по клику.
                geoObjectOpenBalloonOnClick: false,
                // iconLayout: 'default#image',
                // iconImageHref: 'img/pin.png',
                // iconImageSize: [59, 60],
                // iconImageOffset: [-30, -30],
                Icons: [
                    {
                        href: 'img/pin.png',
                        size: [59, 60],
                        offset: [-30, -30]
                    }
                ],
            });

        objectManager.objects.options.set({
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/pin.png',
            // Размеры метки.
            iconImageSize: [59, 60],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-30, -30]
        });

        myMap.geoObjects.add(objectManager);


        $.ajax({
            url: "data.json"
        }).done(function(data) {
            objectManager.add(data);
        });

        // Функция, эмулирующая запрос за данными на сервер.
        function loadBalloonData (objectId) {
            var dataDeferred = ymaps.vow.defer();
            function resolveData () {
                dataDeferred.resolve('Данные балуна');
            }
            window.setTimeout(resolveData, 1000);
            return dataDeferred.promise();
        }

        function hasBalloonData (objectId) {
            return objectManager.objects.getById(objectId).properties.balloonContent;
        }

        objectManager.objects.events.add('click', function (e) {
            var objectId = e.get('objectId');
            if (hasBalloonData(objectId)) {
                objectManager.objects.balloon.open(objectId);
            } else {
                loadBalloonData(objectId).then(function (data) {
                    var obj = objectManager.objects.getById(objectId);
                    obj.properties.balloonContent = data;
                    objectManager.objects.balloon.open(objectId);
                });
            }
        });
    }

    if($('.map').is('div')) {
        $('body').addClass('map-exist')
        ymaps.ready(init);
    }




    // ymaps.ready(function() {
    //     var  map = new ymaps.Map('map', {
    //         center: [55.183554, 61.292456],
    //         zoom: 14,
    //         controls: ['zoomControl'],
    //     }, {
    //         searchControlProvider: 'yandex#search'
    //     }),
    //
    //         office_2 = new ymaps.Placemark(
    //             // [55.175376, 61.352131], {
    //             [55.19362756952232, 61.28526949999999], {
    //                 // hintContent: 'Отдел продаж',
    //                 balloonContent: 'Отдел продаж на Аношкина, 12',
    //             }, {
    //                 iconLayout: 'default#image',
    //                 iconImageHref: 'img/pin.png',
    //                 iconImageSize: [59, 60],
    //                 iconImageOffset: [-30, -30],
    //             }
    //         ),
    //         newtonLC = new ymaps.Placemark(
    //             [55.172922, 61.283375], {
    //                 // hintContent: 'Ньютон',
    //                 balloonContent: 'Офис'
    //             }, {
    //                 iconLayout: 'default#image',
    //                 iconImageHref: 'img/pin.png',
    //                 iconImageSize: [59, 60],
    //                 iconImageOffset: [-30, -30],
    //             }
    //         );
    //     map.behaviors.disable('scrollZoom');
    //     map.behaviors.disable('drag');
    //     map.geoObjects.add(office_2);
    //     map.geoObjects.add(newtonLC);
    // });

    var storeList = $('.row-store');
    var storeSearch = $('.row-search');

    $('.open-list').click(function() {
        storeSearch.fadeOut('100');
        storeList.css("display", "flex").fadeIn('4000');

        $('.game-list').mCustomScrollbar({
            theme:"right-arrows"
        });
    });

    $('.close-btn').click(function() {
        storeList.fadeOut('100');
        storeSearch.css("display", "flex").fadeIn('4000');

        $('.game-list').mCustomScrollbar('destroy');
    });

    //------------------------------------------------------------------------------------------------------------------

    function frontFlip() {
        $(".front")
            .css('transform', 'perspective(1000px) rotateY(0deg)');
        $(".back")
            .css('transform', 'perspective(1000px) rotateY(180deg)');
    }

    function backFlip() {
        $(".back")
            .css('transform', 'perspective(1000px) rotateY(0)');
        $(".front")
            .css('transform', 'perspective(1000px) rotateY(-180deg)');
    }

    $(".flipper").on('click', function() {

        if ($(this).attr('data-click-state') == 1) {
            $(this).attr('data-click-state', 0)
            frontFlip();
        } else {
            $(this).attr('data-click-state', 1)
            backFlip();
        }
    });

    //------------------------------------------------------------------------------------------------------------------

    $('.bxslider').bxSlider({
        // pager: true
        pagerCustom: '.nav-slider'
    });

})(jQuery);

$(function() {

    // -----------
    // Debugger that shows view port size. Helps when making responsive designs.
    // -----------

    function showViewPortSize(display) {
        if(display) {
            var height = window.innerHeight;
            var width = window.innerWidth;
            jQuery('body').prepend('<div id="viewportsize" style="z-index:9999;position:fixed;bottom:0px;left:0px;color:#fff;background:#000;padding:10px">Height: '+height+'<br>Width: '+width+'</div>');
            jQuery(window).resize(function() {
                height = window.innerHeight;
                width = window.innerWidth;
                jQuery('#viewportsize').html('Height: '+height+'<br>Width: '+width);
            });
        }
    }

    // $(document).ready(function(){
    //     showViewPortSize(true);
    // });

});

$(function() {

    // var wave = $('.obj');
    // var winHp = $(window).height() / 100;
    // var maxHp = 100 / ($(document).height() - $(window).height() + wave.height() * 2);
    //
    // console.log(winHp, maxHp);
    //
    // $(window).on('scroll', function(){
    //     var cScroll = $(this).scrollTop();
    //     var p = cScroll * maxHp;
    //     var y =  winHp * p + cScroll;
    //     var x = (Math.sin( p * 0.1) / 2) * 100;
    //     wave.offset({top: y, left: x});
    //
    //     console.log(p, y, x);
    // });
    //
    // $(window).scroll(function(){
    //
    // });






    // $(window).bind('mousewheel', function(event) {
    //     if (event.originalEvent.wheelDelta >= 0) {
    //         $(".obj").animate({top:'-=170', left:'+=170', opacity: '1'},100);
    //     }
    //     else {
    //         $(".obj").animate({top:'+=170', left:'-=170', opacity: '1'},100);
    //     }
    // });
    //
    // $('body').scroll(function() {
    //
    // });
    //
    // $(window).on('load', 'click', function() {
    //
    // })

        // .animate({marginTop:'+=210', marginLeft: '-=290'},200)
        // .animate({marginLeft:'+=290'},1000)
        // .animate({marginTop:'-=210', marginLeft: '-=290'},1000)


});
















