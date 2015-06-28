var mobile = ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);

var IElte8 ='\v'=='v';

var $window = $(window);

$(document).ready(function(){
    if (mobile){
        $('#header').before('<div id="q"></div>');
        $window.resize(function(){
            if ( $window.height() > $window.width() ){
                $('body').addClass('portrait');
            }
            else{
                $('body').removeClass('portrait');
            }    
        });
        
    }
	
	if ($.isFunction($.fancybox)){
		$('.fancy-link').fancybox({padding: 20});
        $('.btn.close').click(function(e){
            e.preventDefault();
            $.fancybox.close();
        })
	}

    $('div > .fancybox-close').click(function(e){
        e.preventDefault();
        $(this).parent().removeClass('active').hide();
    });

    $('.order-option-wrapper .sector, .sector-link').fancybox({
        wrapCSS: 'sector-desc',
        padding: 0,
        minWidth: 920,
        minHeight: 430
    });

    $('.items-wrapper .fancy-link').fancybox({
        wrapCSS: 'video',
        padding: 0,
        //minWidth: 920,
        //minHeight: 430
    });

	//$('.catalog-section-slider, .main-slider').scrollable();

    (function(){
        var slider = $('.main-slider');
        var links = $('#slider-current-picture a, a.slider-link');
        var image = $('#slider-current-picture img');
        var timeout;
        slider.scrollable({
            prev: slider.find('.scroll.prev'),
            next: slider.find('.scroll.next'),
            onBeforeSeek: setImg,
            speed: 300
        }).autoscroll(5000);
        var sData = slider.data('scrollable');

        function setImg(){
            var e = sData.getItems().eq(sData.getIndex());
            image.fadeOut(300, function(){
                links.attr('href', e.data('href'))
                image.attr('src', e.data('slide-image'));
                image.one('load', function(){
                    image.fadeIn('fast');
                    clearTimeout(timeout);
                });
                timeout = setTimeout(function(){image.fadeIn('fast');},500);
            });
        }
    })();

    (function(){
        var sliders = $('.main-data-block .slider:not(.club-leaders), .main-data-block .club-leaders .tab-content');

        sliders.each(function(){
            var slider = $(this);
            var timeout;

            var image = slider.find('.slider-image img');

            function setImg(){            
                image.fadeOut(300, function(){
                  image.attr('src', sData.getItems().eq(sData.getIndex()).data('slide-image'));
                  image.one('load', function(){
                    image.fadeIn('fast');
                    clearTimeout(timeout);
                  });
                  timeout = setTimeout(function(){image.fadeIn('fast');},500);
                });            
            }
            
            if (slider.find('.items').length) {
                slider.scrollable({
                    prev: slider.find('.scroll.prev'),
                    next: slider.find('.scroll.next'),
                    speed: 300,
                    onBeforeSeek: function(){
                        if (image != 'undefined') setImg();
                    }
                });

                var sData = slider.data('scrollable'); 
                if(slider.is('.ended-matches')) sData.seekTo(sData.getSize()-1,0)  

                $window.resize(function(){
                    slider.find('.item').css('width',slider.width());
                    sData.seekTo(sData.getIndex(),0)
                }); 
            }
        });
        $window.resize();
    })();

	//(function(){
     //   if (typeof ymaps !== 'undefined'){
     //       ymaps.ready(function(){
     //           var map = new ymaps.Map('map', {center: [55.708582, 37.662264],zoom: 16});
     //           map.behaviors.disable("scrollZoom");
     //       });
    //
     //       $window.resize(function(){
     //           $('.contacts-block .map').height(Math.max(545, ($window.height() -$('#footer').height() - $('#header').height() - $('.page-header-block').outerHeight()) ) )
     //       }).resize();
     //   }
	//})();

	$('.select').each(function(){
        var container = $(this);
        var select = container.find('select');
        var label = container.find('label');
        label.text(select.find(':selected').text() || ' ');
        select.change(function(){
            label.text($(this).find(':selected').text());
        });
    });

    (function(){
        var sliders = $('.main-news-block, .main-media-block, .main-video-block, .main-social-block');
        
        sliders.each(function(){
            var timeout;
            var slider = $(this);
            var block = slider.find('.slider-holder');
            var d = ($window.width() - block.width()) / 2;
            $window.resize(function(){
                d = ($window.width() - block.width()) / 2                
            }).resize();

            slider.mouseenter(function(){
                clearTimeout(timeout);
                block.stop().animate({
                    //'padding-left': d,
                    //'margin-left': -d,
                    //'padding-right': d,
                    //'margin-right': -d
                    'padding-left': d+207,
                    'margin-left': -(d+207),
                    'padding-right': d+207,
                    'margin-right': -(d+207)
                }, 300);    
            }).mouseleave(function(){
                timeout = setTimeout(function(){
                    block.stop().animate({
                        'padding-left':0,
                        'margin-left': 0,
                        'padding-right':0,
                        'margin-right': 0
                    }, 300);

                }, 1000);

            });
        });
    })();


    (function(){
        var blocks = $('.main-media-block, .main-news-block, .main-video-block, .main-social-block');
        blocks.each(function(){
            var block = $(this);
            block.rotor();
            if (mobile) block.addClass('mobile');
            var items = block.find('.items');
            var timeout;
            function checkPos(){
                var iw = items.find('item').width();
                if ( items.position().left > 0 ) items.animate({left: 0}, 300, function(){
                    block.find('.prev').addClass('disabled')
                    block.find('.next').removeClass('disabled')
                })
                else if ( items.width() > block.width() && items.position().left <  block.width() - items.width() ) items.animate({left: block.width() - items.width()}, 300, function(){
                    block.find('.next').addClass('disabled')
                    block.find('.prev').removeClass('disabled')
                })
                else{
                    items.animate({left: Math.round(items.position().left/iw)*iw }, 300)
                    block.find('.scroll').removeClass('disabled')
                }
            }
            items.draggable({
                axis: "x",
                snap: block.find('.items-holder'),
                snapMode: 'inner',
                snapTolerance: 10,
                stop: function(){
                    checkPos();
                }
            });
            block.find('.scroll').click(function(){
                clearTimeout(timeout);
                timeout = setTimeout(checkPos,300);
            });

            if (mobile){
                var left = items.position().left;
                var pX, pY;
                items.each(function(){
                    this.addEventListener('touchstart', function(event) {
                        //event.preventDefault();
                        left = items.stop().position().left
                        pX = event.touches[0].pageX;
                        pY = event.touches[0].pageY;
                    }, false);
                    this.ontouchmove = function(event){
                        if (Math.abs(event.touches[0].pageY - pY) < 10) event.preventDefault()
                        items.css('left', left + (event.touches[0].pageX - pX))
                    }
                    this.ontouchend = function(e){
                        setTimeout(checkPos, 50);
                    }
                })
            }


        });
        
    })();

    $('.main-media-block.tabs-content.active').each(function(){
        var item = $(this).find('.item')


        //item.each(function(){
        //    var itemWidth = $(this).width();
        //    var sum = 0;
        //    sum += parseInt(itemWidth, 10);
        //
        //    console.log(sum)
        //});


        var totalWidth = 0;

        item.each(function(index) {
            totalWidth += parseInt($(this).width(), 10);
            console.log(totalWidth)
        });

    });

    (function(){
        var block = $('.play-off-holder');
        var table = block.find('.play-off-table');
        var west = $('.play-off-triggers .west');
        var east = $('.play-off-triggers .east');

        function checkPos(){

                if ( table.position().left > 0 ) table.animate({left: 0}, 300, function(){
                    west.addClass('active');
                    east.removeClass('active');
                })
                else if ( table.position().left <  block.width() - table.width() ) table.animate({left: '-68.98%'}, 300, function(){
                    west.removeClass('active');
                    east.addClass('active');
                })
                else{
                    //items.animate({left: Math.round(items.position().left/iw)*iw }, 300)
                    west.removeClass('active');
                    east.removeClass('active');
                }
            }

        table.draggable({
            axis: "x",
            snap: block.find('.items-holder'),
            snapMode: 'inner',
            snapTolerance: 10,
            stop: function(){
                checkPos();
            }
        });
        if (mobile){
            var left = table.position().left;
            var pX, pY;
            table.each(function(){
                this.addEventListener('touchstart', function(event) {
                    //event.preventDefault();
                    left = table.stop().position().left
                    pX = event.touches[0].pageX;
                    pY = event.touches[0].pageY;
                }, false);
                this.ontouchmove = function(event){
                    if (Math.abs(event.touches[0].pageY - pY) < 10) event.preventDefault()
                    table.css('left', left + (event.touches[0].pageX - pX))
                }
                this.ontouchend = function(e){
                    setTimeout(checkPos, 50);
                }
            });
        }
        east.click(function(){
            table.animate({left: '-68.98%'}, 300);
            west.removeClass('active');
            east.addClass('active');
            return false
        });
        west.click(function(){
            table.animate({left: 0}, 300);
            west.addClass('active');
            east.removeClass('active');
            return false
        })
    })();

    (function(){
        var blocks = $('.main-matches-table-block .table-holder, .main-data-block .table-holder');
        blocks.each(function(){

            var block = $(this);
            if (mobile) block.addClass('mobile');
            var table = block.find('.table');
            if (table.height() > block.height()){
                table.addClass('drag').draggable({
                    axis: "y",
                    snap: block,
                    snapMode: 'inner',
                    snapTolerance: 10,
                    stop: function(){
                        if ( table.position().top > 0 ) table.animate({top: 0}, 300);
                        if ( table.height() > block.height() && table.position().top <  block.height() - table.height() ) table.animate({top: block.height() - table.height()}, 300);
                    }
                });      
            }
                      
        });
    })();

    (function(){
        var block = $('.bottom-sitemap-block');
        var toggle = block.find('.toggle');

        var singleSection = $('.bottom-sitemap-block .section-content .category .category-title.single');
        var singleSectionLink = $('.bottom-sitemap-block .section-content .category .category-title.single a');
        var singleSectionWrap = $('<div class="block" />');

        singleSectionLink.appendTo(singleSectionWrap);
        singleSectionWrap.appendTo(block);

        toggle.click(function(){

            if (block.is('.closed')){
                block.find('.section-content').fadeIn('fast');

                singleSectionLink.appendTo(singleSection);
                singleSectionWrap.remove();
            }
            else{
                block.find('.section-content').fadeOut('fast');
                singleSectionLink.appendTo(singleSectionWrap);
                singleSectionWrap.appendTo(block);
            }
            block.toggleClass('closed');
        });
    })();

    (function(){
        var link = $('#upLink');
        $window.scroll(function(){
            if ($window.scrollTop() > $window.height() * 0.7 && link.is(':hidden')) {
                link.fadeIn('fast');
            }

            if ($window.scrollTop() < $window.height() * 0.7 && link.is(':visible')) {
                link.fadeOut('fast');
            }
        }).scroll();

        link.click(function(){
            $('body, html').animate({scrollTop: 0}, $window.scrollTop() * 0.5);
        })
    })();

    $('.tabs-block').each(function(){
        var block  = $(this);
        var activeClass = 'active';
        var tabsContainer = $(this).find('.tabs').first();
        var tabs = tabsContainer.find('a');
        var blocksContainer = $(this).find('.tabs-holder').first();
        var blocks = blocksContainer.length ? blocksContainer.find('>.tab-content') : $(this).find('.tab-content');

        if (!tabs.length){
            var temp='';
            for (var i = 0; i < blocks.length; i++) {
                temp += '<li><a href="#"></a></li>';
            };
            tabsContainer.html(temp);
            tabs = tabsContainer.find('a');
        }
        var order = tabs.attr('data-tab-id') ? false : true;

        tabs.filter('.active').length || tabs.first().addClass('active');

        blocks.not(function(){
            if (order){
                return blocks.index(this) == tabs.index(tabs.filter('.active'));
            }
            else{
                return tabs.filter('.active').attr('data-tab-id') == '#'+$(this).attr('id');
            }
        }).hide();

        tabs.on('click',function(){
            if ( !$(this).hasClass(activeClass)){
                var b = order ? blocks.eq(tabs.index(this)) : $($(this).attr('data-tab-id'));
                tabs.removeClass(activeClass);
                $(this).addClass(activeClass);
                blocks.filter(':visible').fadeOut('fast', function(){b.fadeIn('fast'); $window.resize();});
                $window.resize();
             }
          return false;
        });
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function itemHeight(){
        $('.news-wrapper .news-item').dotdotdot({height: 390});
        $('.coach-wrapper .coach-item .description .text').dotdotdot({height: 150});
        $('.articles-wrapper ul li').dotdotdot({height: 210});
    };

    itemHeight();

    setInterval(itemHeight, 300)


    $(window).resize(function(){
        itemHeight();
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var itemImg = $('.main-news-block .items .picture img');
    var itemImgWidth = itemImg.width();
    var itemImgHeight = itemImg.height();
    var itemImgMarginLeft = itemImgWidth/2;
    var itemImgMarginTop = itemImgHeight/2;

    itemImg.css({
        'margin-left': -itemImgMarginLeft,
        'margin-top': -itemImgMarginTop
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    function mediaImgPosition(){

        var videoImg = $('.main-video-block .items-holder .items .item .event .picture img');
        var videoImgWidth = videoImg.width();
        var videoImgHeight = videoImg.height();
        var videoImgMarginLeft = videoImgWidth/2;
        var videoImgMarginTop = videoImgHeight/2;

        videoImg.css({
            'margin-left': -videoImgMarginLeft,
            'margin-top': -videoImgMarginTop
        });


        var mediaWrapperMain = $('.index .main-media-block');
        var mediaItemMain = mediaWrapperMain.find('.items-holder .items .item');


        mediaItemMain.each(function(){
            var mediaItemMainLink = mediaItemMain.find('.event');

            mediaItemMainLink.each(function(i){
                var mediaItemMainImg = mediaItemMainLink.find('.picture img');
                var mediaItemImgMainWidth = mediaItemMainImg.eq(i).width();
                var mediaItemImgMainHeight = mediaItemMainImg.eq(i).height();

                var mediaItemImgMainMarginLeft = mediaItemImgMainWidth/2;
                var mediaItemImgMainMarginTop = mediaItemImgMainHeight/2;


                mediaItemMainImg.eq(i).css({
                    'margin-left': -mediaItemImgMainMarginLeft,
                    'margin-top': -mediaItemImgMainMarginTop
                });
            });
        });


        var mediaImg = $('.page .main-media-block .item .event .picture img');
        var mediaImgWidth = mediaImg.width();
        var mediaImgHeight = mediaImg.height();
        var mediaImgMarginLeft = mediaImgWidth/2;
        var mediaImgMarginTop = mediaImgHeight/2;

        mediaImg.css({
            'margin-left': -mediaImgMarginLeft,
            'margin-top': -mediaImgMarginTop
        })
    }

    mediaImgPosition();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.media-tabs-wrapper ul.tabs').on('click', 'li:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active').closest('div.media-tabs-wrapper').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        mediaImgPosition();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.news .fixed-navigation a span').dotdotdot({height: 44});

    $('.comments-wrapper .comment-item').hover(function(){
        $(this).toggleClass('hovered');
    });

    (function(){
        var b = $('.comments-wrapper');
        var form = b.find('.reply-form-wrapper');
        b.on('click', '.reply', function(){
            var link = $(this);
            form.fadeIn(300).offset({
                top: link.offset().top + 25,
                left: link.offset().left - 20
            });
            return false;
        });
    })();

    $('.guestbook-wrapper .guestbook-item').hover(function(){
        $(this).toggleClass('hovered');
    });

    $('.items-wrapper .col-right .filters select').selectbox({
        onOpen: function (inst) {
            $('.sbHolder').addClass('open');
        },
        onClose: function (inst) {
            $('.sbHolder').removeClass('open');
        },
        onChange: function (inst) {
            $('.sbHolder').addClass('changed');
        }
    });

    function selectBoxAttach() {
        $('.select-row select').selectbox({
            onOpen: function (inst) {
                $('.sbHolder').addClass('open');
            },
            onClose: function (inst) {
                $('.sbHolder').removeClass('open');
            },
            onChange: function (inst) {
                $('.sbHolder').addClass('changed');
            }
        }, 'attach');

        console.log('load')
    }


    $('.news-list-footer .fancy-link').fancybox({
        wrapCSS: 'news-serch'
    });
    $('.news-list-footer .fancy-link').click(function(){
        selectBoxAttach()
    });





    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var gamerPhotoWrapper = $('.main-media-block.gamer .items .item');
    var gamerPhoto = gamerPhotoWrapper.find('.event');

    function showAlbum() {

        $('.photos .fotorama').fotorama({
            width: 700,
            maxwidth: '100%',
            ratio: 16/9,
            nav: 'thumbs'
        });

    }

    var closeAlbum = $('<a href="#" class="close-album"></a>');

    $('.photos .fotorama').on('fotorama:ready', function (e, fotorama) {

        var nextAlbum = $('.photos .next-album');

        nextAlbum.insertAfter($(".fotorama__nav__shaft .fotorama__nav__frame--thumb:last"));
        closeAlbum.insertAfter($('.fotorama__wrap'));

        //var currentPhoto = gamerPhotoWrapper.find('.event');
        //currentPhoto.click(function(e){
        //    e.preventDefault();
        //    var photoIndex = $(this).parent().index();
        //    fotorama.show(photoIndex)
        //});

        closeAlbum.click(function(e){
            e.preventDefault();
            $('.photos').removeClass('show');
            fotorama.destroy();
            nextAlbum.insertAfter('.fotorama');
            $(this).remove();
        });

    });

    $('.items-wrapper:not(.wallpapers) .col-left .items .list-item .event').click(function(e){
        e.preventDefault();
        closeAlbum.show('show');
        $(this).next('.photos').addClass('show');
        showAlbum();
    });



    gamerPhoto.click(function(e){
        e.preventDefault();
        $(this).parents('.slider-holder').next('.photos').addClass('show');
        showAlbum();
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    //gamerPhoto.click(function(e){
    //    e.preventDefault();
    //    showAlbum();
    //    $(this).parents('.main-media-block').find('.photos').addClass('show');
    //    showBtns();
    //
    //});


    //console.log('Index: ' + gamerPhotoWrapper.index("li"));



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //(function () {
    //    var _preventDeault = function (e) {
    //            e.stopPropagation();
    //            e.preventDefault();
    //        },
    //        touchClick = function ($el, fn) {
    //            var el = $el[0];
    //            if (el && el.addEventListener) {
    //                el.addEventListener('touchstart', fn, false);
    //                el.addEventListener('MSPointerDown', fn, false);
    //            }
    //            return $el.on('mousedown', fn);
    //        },
    //        preventDefault = function ($el) {
    //            return touchClick($el, _preventDeault);
    //        };
    //
    //    var now;
    //
    //    $(document).on('fotorama:show', '.fotorama--lenta', function (e, fotorama, extra) {
    //        var $fotorama = $(this);
    //
    //        if (extra.user && !fotorama._isOpen) {
    //            fotorama._isOpen = true;
    //            fotorama.setOptions({trackpad: false, nav: 'thumbs', transitionduration: 333});
    //
    //            $fotorama.css({height: fotorama.options.height}).addClass('fotorama--dots-overlay');
    //
    //            if (!fotorama._isTouched) {
    //                fotorama._isTouched = true;
    //                fotorama.requestFullScreen();
    //
    //                var $close = $('<div class="fotorama__fullscreen-icon"></div>');
    //                $('.fotorama__stage', $fotorama).append(
    //                    preventDefault(touchClick($close, function () {
    //                        if (fotorama._isOpen) {
    //                            fotorama._isOpen = false;
    //
    //                            fotorama.setOptions({nav: 'thumbs', trackpad: true});
    //                            $fotorama.css({height: fotorama.options.thumbheight}).removeClass('fotorama--dots-overlay');
    //                        }
    //                    }))
    //                );
    //
    //                preventDefault($fotorama);
    //            }
    //        }
    //    });
    //})();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.tabs-wrapper ul.tabs').on('click', 'li:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active').closest('div.tabs-wrapper').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#header').affix({
        offset: {
            top: 100,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    })

    /////////////////////////////////////////////////// equal height ///////////////////////////////////////////////////

    equalheight = function(container){

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {

            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    };

    $(window).load(function() {
        $('.staff-wrapper .staff-item .caption').css('min-height', '90px');
        equalheight('.staff-wrapper .staff-item .caption');
    });


    $(window).resize(function(){
        equalheight('.staff-wrapper .staff-item .caption');
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var firstClick = true;
    var guestbookWrapper = $('.guestbook-wrapper');
    var reply = $('a.reply');

    reply.click(function(e){

        e.preventDefault();

        var bt = $(this).offset().top;
        var bl = $(this).offset().left;

        var activeForm = guestbookWrapper.find('.active');
        var replyWrapper = $(this.hash);
        var replyItem = $(this).parents('.item-content');

        activeForm.removeClass('active').hide();

        if (replyWrapper.hasClass('active')){
            activeForm.hide();
        } else {
            replyWrapper.addClass('active').show().offset({
                top: bt + 20,
                left: bl - 20
            });
            activeForm.removeClass('active').hide();
        };

        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest(replyItem).length == 0) {
                replyWrapper.removeClass('active').hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });

    });

    /* /////////////////////////// */

    $('.order-wrapper.collapsed .col-right .show').click(function(e){
        e.preventDefault();
        $(this).parents('.order-wrapper').toggleClass('collapsed');
    });

    /* /////////////////////////// */

    if ($('div').is("#map")) {

        var myMap;

        function init(){
            myMap = new ymaps.Map("map", {
                center: [55.17471275, 61.28688127],
                zoom: 15
            });
            var myPlacemark = new ymaps.Placemark(
                [55.75399400, 37.62209300], {hintContent: '?? ???????'}
                //{
                //    iconLayout: 'default#image',
                //    iconImageHref: 'pic/pin.png',
                //    iconImageSize: [88, 88],
                //    iconImageOffset: [-45, -80]
                //}
            );
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable("scrollZoom");
            myMap.controls.remove('searchControl');
        };
        ymaps.ready(init);
    }


    /* /////////////////////////// */

    var place = $('.championship .content-wrapper');
    var placeWidth = $('.championship .content-wrapper').outerWidth();
    var placeMinHeight = $('.championship .related-media').height();
    var champTable = $('.championship-wrapper table');
    place.css('min-height', placeMinHeight-79);
    champTable.css('width', placeWidth);

    $(window).resize(function(){
        var placeWidth = $('.championship .content-wrapper').outerWidth();
        var champTable = $('.championship-wrapper table');

        champTable.css('width', placeWidth);
    });

    /* /////////////////////////// */

    $('.chooseChamp .chooseChampLink').click(function(e){
        e.preventDefault();
        $(this).next('.chooseChampList').toggleClass('show');

        $(document).click(function(event) {
            if ($(event.target).closest('.chooseChamp').length) return;
            $('.chooseChampList').removeClass("show");
            event.stopPropagation();
        });
    });

    /* /////////////////////////// */

    var tenders = $('.tender-item:not(.tender-block)');

    $('.tender-block .title a').click(function(){return false})

    tenders.each(function(){
        var t = $(this).find('.title').outerHeight(true);
        var c = $(this).find('.title').next('p').outerHeight(true);

        var h = t + c;

        $(this).css('height', (h+45));
        $(this).find('.tender-content').css('height', h);

    });

    var tenderTitle = tenders.find('.title > a');

    tenderTitle.click(function(e){
        e.preventDefault();
        $(this).parents('.tender-item').toggleClass('show');
    });

    // Chart
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var charts = $('.chart-wrapper');

    var chartsGoals = charts.find('.chart-item.throws-goals');
    var indicatorGoals = chartsGoals.find('.indicators');

    var throwBlock = indicatorGoals.find('.first .num');
    var goalsBlock = indicatorGoals.find('.last .num');

    var throws = parseInt(throwBlock.text(), 10 );
    var goals = parseInt(goalsBlock.text(), 10 );

    var goalsLine = chartsGoals.find('.green-line');
    var goalsLineWidth = (goals*100)/throws;
    goalsLine.css('width', goalsLineWidth + '%');

    //////////////

    var chartsFaceoff = charts.find('.chart-item.faceoff');
    var indicatorFaceoff = chartsFaceoff.find('.indicators');

    var firstFaceoff = indicatorFaceoff.find('.first .num');
    var lastFaceoff = indicatorFaceoff.find('.last .num');

    var faceoff = parseInt(firstFaceoff.text(), 10 );
    var faceoffWin = parseInt(lastFaceoff.text(), 10 );

    var faceoffLine = chartsFaceoff.find('.green-line');
    var faceoffLineWidth = (faceoffWin*100)/faceoff;
    faceoffLine.css('width', faceoffLineWidth + '%');

    //////////////

    var chartsMM = charts.find('.chart-item.majority-minority');

    var majorityBlock = chartsMM.find('.first .num');
    var minorityBlock = chartsMM.find('.last .num');

    var majority = parseInt(majorityBlock.text(), 10 );
    var minority = parseInt(minorityBlock.text(), 10 );

    var redLineMM = chartsMM.find('.red-line');
    var redLineMMWidth = (majority*100)/goals;
    redLineMM.css('width', redLineMMWidth + '%');

    var qwerty = (minority*100)/majority;
    var greenLineMMWidth = (redLineMMWidth/100)*qwerty;
    var greenLineMM = chartsMM.find('.green-line');
    greenLineMM.css('width', greenLineMMWidth + '%');


    // Statistics
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var statItem = $('.statistic-chart-wrapper .row .col.item');

    statItem.each(function(){
        var redLine = $(this).find('.red-line');
        var greenLine = $(this).find('.green-line');

        var redNumBlock = $(this).find('.num.red');
        var greenMumBlock = $(this).find('.num.green');

        var redNum =  parseInt(redNumBlock.text(), 10 );
        var greenNum = parseInt(greenMumBlock.text(), 10 );

        var full = redNum+greenNum;

        var redLineWidth = (redNum*100)/full;
        var greenLineWidth = (greenNum*100)/full;

        redLine.css('width', redLineWidth + '%');
        greenLine.css('width', greenLineWidth + '%');

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var bgImage = $('.blur');
    bgImage.prependTo($('body'));

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var teamMembersLeft = $('.col-left .team-members li > div'), maxWidthLeft = 0;

    teamMembersLeft.each(function () {
        var width = parseInt($(this).width());
        if(width > maxWidthLeft) {
            maxWidthLeft = width;
        };
    });

    teamMembersLeft.parents('.team-members').css('width', maxWidthLeft);

    var teamMembersRight = $('.col-right .team-members li > div'), maxWidthRight = 0;

    teamMembersRight.each(function () {
        var width = parseInt($(this).width());
        if(width > maxWidthRight) {
            maxWidthRight = width;
        };
    });

    teamMembersRight.parents('.team-members').css('width', maxWidthRight);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var protocolWrapper = $('.protocol-wrapper');
    var protocolHeght = protocolWrapper.find('.large-img').height();
    protocolWrapper.css('min-height', protocolHeght);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var sectorPlaceWrapper = $('.places');
    var disablePlace = $('.places .row > span.disable a');
    var sectorPlace = $('.places .row > span:not(.empty, .disable) a');
    var sumBlock =  $('.order-option-wrapper').find('.ticket-count .sum');

    disablePlace.attr('disable', 'disable').click(function(e){
        e.preventDefault();
    });

    sectorPlace.click(function(e){
        e.preventDefault();
        $(this).parent().toggleClass('selected');

        var amount = $(this).parents('.places').find('.selected').length;
        var count =  $(this).parents('.order-option-wrapper').find('.ticket-count .count');
        var text =  $(this).parents('.order-option-wrapper').find('.ticket-count .text');

        function declOfNum(number, titles){
            cases = [2, 0, 1, 1, 1, 2];
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
        }

        count.text(amount);
        text.text(declOfNum(amount,['место','места','мест']));

        var selected = sectorPlaceWrapper.find('.selected a');
        var sum = 0;
        selected.each(function (){
            sum += parseInt($(this).data('placePrice'), 10);
        });
        sumBlock.text(sum);

        var selLength = selected.length;

        if (selLength == 0 && selLength != 1 && selLength != 2 && selLength != 3){
            $('.ticket-count').removeClass('one two more');
        } else if (selLength == 1 && selLength != 2 && selLength != 3){
            $('.ticket-count').removeClass('two more');
            $('.ticket-count').addClass('one');
        } else if (selLength == 2 && selLength != 1 && selLength != 3){
            $('.ticket-count').removeClass('one more');
            $('.ticket-count').addClass('two');
        } else if (selLength >= 3 && selLength != 1 && selLength != 2){
            $('.ticket-count').removeClass('one two');
            $('.ticket-count').addClass('more');
        }

    });

    (function(){
        $('.gamer .photo img').click(function(){
            $(this).hide().siblings().filter(':hidden').show();
        });
    })();

});


