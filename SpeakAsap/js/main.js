$(function() {
    $.material.init();

    //Navigation Menu Slider
    $('#nav-expander').on('click',function(e){
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
    });
    $('#nav-close').on('click',function(e){
        e.preventDefault();
        $('body').removeClass('nav-expanded');
    });

    // Initialize navgoco with default options
    $(".main-menu").navgoco({
        caret: '<span class="caret"></span>',
        accordion: false,
        openClass: 'open',
        save: true,
        cookie: {
            name: 'navgoco',
            expires: false,
            path: '/'
        },
        slide: {
            duration: 300,
            easing: 'swing'
        }
    });

    $(".go-top").click(function (){
        //$(this).animate(function(){
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 700);
        //});
    });

    //$('.lang-nav .lang-items').bxSlider({
    //    slideWidth: 90,
    //    minSlides: 1,
    //    maxSlides: 20,
    //    moveSlides: 1,
    //    pager: false,
    //    //infiniteLoop: false,
    //    //hideControlOnEnd: true
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    var mobile = ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);

    (function(){
        var sliders = $('.main-news-block');

        sliders.each(function(){
            var timeout;
            var slider = $(this);
            var block = slider.find('.slider-holder');
            var d = ($(window).width() - block.width()) / 2;
            $(window).resize(function(){
                d = ($(window).width() - block.width()) / 2
            }).resize();

            slider.mouseenter(function(){
                clearTimeout(timeout);
                block.stop().animate({
                    'padding-left': d,
                    'margin-left': -d,
                    'padding-right': d,
                    'margin-right': -d
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
        var blocks = $('.main-news-block');
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////



});
