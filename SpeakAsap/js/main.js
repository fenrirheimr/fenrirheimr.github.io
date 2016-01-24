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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    equalheight = function(container) {

        var currentTallest = 0, currentRowStart = 0, rowDivs = new Array(), $el, topPosition = 0;
        $(container)
            .each(
            function() {

                $el = $(this);
                $($el).height('auto')
                topPostion = $el.position().top;

                if (currentRowStart != topPostion) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPostion;
                    currentTallest = $el.height();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.height()) ? ($el
                        .height())
                        : (currentTallest);
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
            });
    };

    $(window).load(function() {
        equalheight('.products > section > .row > div > .block-content');
    });

    $(window).resize(function() {
        equalheight('.products > section > .row > div > .block-content');
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////



});
