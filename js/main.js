$(function() {

    ////////////////////////////////////////////// Select region and city //////////////////////////////////////////////

    var panel_nav = $('.select-region-wrapper .panel .nav-icn');
    var region_reg_input = $('.tabs-wrapper form fieldset .region input');
    var select_panel = $('.select-panel');
    var region_name = $('.select-panel .sub-items-wrapper a');
    var region_input = $('.select-region-wrapper .panel .name');
    var selected_region = $('.select-panel input');
    var close_panel = $('.select-panel .close');



    function wrap_overlay(){
        select_panel.wrap('<div class="overlay" />');
        $('html').addClass('locked')
    };
    function unwrap_overlay(){
        select_panel.unwrap('<div class="overlay" />');
        $('html').removeClass('locked')
    };

    $('.amend').click(function(){
        wrap_overlay();
        select_panel.show();
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest('.select-panel').length == 0) {
                unwrap_overlay();
                select_panel.hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });
    });

    panel_nav.click(function(){
        wrap_overlay();
        select_panel.show();
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest('.select-panel').length == 0) {
                unwrap_overlay();
                select_panel.hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });
    });

    region_reg_input.click(function(){
        wrap_overlay();
        select_panel.show();
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest('.select-panel').length == 0) {
                unwrap_overlay();
                select_panel.hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });
    });

    region_name.click(function(e){
        e.preventDefault();
        var region_text = $(this).text();
        $(this).parent().parent().parent().parent().parent().find('li.current').removeClass('current');
        $(this).parent().addClass('current').siblings().removeClass('current');
        region_input.text(region_text);
        selected_region.val(region_text);
        region_reg_input.addClass('used').val(region_text);
    });

    close_panel.click(function(e){
        e.preventDefault();
        setTimeout(function(){
            unwrap_overlay();
            select_panel.hide();
        }, 400);
        $(document).unbind('click.myEvent');
    });



    ///////////////////////////////////////////////////// Plugins //////////////////////////////////////////////////////

    $('.sub-items-wrapper > ul').easyListSplitter({
        colNumber: 4,
        direction: 'vertical'
    });
    $('.sub-catalog-list > ul').easyListSplitter({
        colNumber: 4,
        direction: 'vertical'
    });

    $('.item-feature').easyListSplitter({
        colNumber: 2,
        direction: 'vertical'
    });

    $('.choose-lang-wrapper select').styler();
    $('.header-search-wrapper select').styler();
    $('.advert .category-filter-wrapper .custom-select select').styler();
    $('.custom-select.sorted-list select').styler();

    $('.promo-slider .bxslider').bxSlider({mode: 'fade', auto: true, width: 1300});

    $('.section-nav, .personal-nav').lavaLamp({
        easing: 'easeOutBack',
        speed: 500,
        homeTop: -1,
        homeLeft: -1
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.services-link').tooltip({
        //track: true,
        position: {
            my: "center-6 bottom-8",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });

    $('.photos .services-link').tooltip({
        //track: true,
        position: {
            my: "left top",
            at: "right+7 top+7",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //vars
    var premium_ads_conveyor = $(".content-conveyor", $(".premium-ads")),
        premium_ads_item = $(".premium-ads-item", $(".premium-ads"));

    //set length of conveyor
    premium_ads_conveyor.css("width", premium_ads_item.length * parseInt(premium_ads_item.css("width")));
    var premium_ads_max = (premium_ads_item.length * parseInt(premium_ads_item.css("width"))) - parseInt($(".viewer", $(".premium-ads")).css("width"));

    //config
    var premium_ads_opts = {
        max: premium_ads_max,
        range: "min",
        slide: function(e, ui) {
            premium_ads_conveyor.css("left", "-" + ui.value + "px");
            //premium_ads_conveyor.animate({
            //    left: "-" + ui.value + "px"
            //}, 220);
        }
    };

    //create slider
    $("#slider-01").slider(premium_ads_opts);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //vars
    var last_msg_conveyor = $(".content-conveyor", $(".last-messages")),
        last_msg_item = $(".last-msg-item", $(".last-messages"));

    //set length of conveyor
    last_msg_conveyor.css("width", last_msg_item.length * parseInt(last_msg_item.css("width")));
    var last_msg_max = (last_msg_item.length * parseInt(last_msg_item.css("width"))) - parseInt($(".viewer", $(".last-messages")).css("width"));

    //config
    var last_msg_opts = {
        max: last_msg_max,
        range: "min",
        slide: function(e, ui) {
            last_msg_conveyor.css("left", "-" + ui.value + "px");
            //last_msg_conveyor.animate({
            //    left: "-" + ui.value + "px"
            //}, 220);
        }
    };

    //create slider
    $("#slider-02").slider(last_msg_opts);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.ui-slider-handle').mousedown(function(){
        $(this).addClass('pressed');
        $(this).prev('div.ui-slider-range').addClass('pressed');
    });
    $('.ui-slider-handle').mouseup(function(){
        $(this).removeClass('pressed');
        $(this).prev('div.ui-slider-range').removeClass('pressed');
    });

    $(window).on('beforeunload',function(){
        $("form.material").each(function(){
            $(this)[0].reset();
        });

    });

    $('input').blur(function() {
        var $this = $(this);
        if ($this.val())
            $this.addClass('used');
        else
            $this.removeClass('used');
    });

    $('textarea').blur(function() {
        var $this = $(this);
        if ($this.val())
            $this.addClass('used');
        else
            $this.removeClass('used');
    });

    if($('div').is('.sub-catalog-wrapper')){
        var scl = $('.sub-catalog-wrapper').outerHeight();

        $('.left-column').css('margin-top', (scl + 30));
        $('.right-column').css('margin-top', (scl + 30));
    }

    //////////////////////////////////////////////////// Checkbox //////////////////////////////////////////////////////

    var cl = $('.custom-checkbox label');

    cl.click(function() {

        // find the first span which is our circle/bubble
        var el = $(this).children('span:first-child');

        // add the bubble class (we do this so it doesnt show on page load)
        el.addClass('circle');

        // clone it
        var newone = el.clone(true);

        // add the cloned version before our original
        el.before(newone);

        // remove the original so that it is ready to run on next click
        $(this).children("span.circle:last").remove();
    });


    ////////////////////////////////////////////////////// Tabs ////////////////////////////////////////////////////////

    $('ul.tabs a').click(function(e){e.preventDefault();})
    $('ul.tabs').on('click', 'li:not(.current)', function() {
        $(this).addClass('current').siblings().removeClass('current')
            .parents('div.tabs-wrapper').find('div.box').eq($(this).index()).fadeIn().siblings('div.box').hide();
    });

    //////////////////////////////////////////// FancyBox //////////////////////////////////////////////////////////////

    $('.catalog-item-info .meta .send-mess').fancybox({
        maxWidth: 310,
        mouseWheel: false,
        padding: 40,
        wrapCSS: 'mess',
        scrolling : 'no',
        helpers: {
            overlay: {
                locked: false,
                css: {'background': 'rgba(0,0,0,0.6)'}
            }
        },
        tpl: {
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i class="icon close-icn"></i></a>'
        }
    });

    $('.catalog-item .complaint-mess').fancybox({
        maxWidth: 310,
        mouseWheel: false,
        padding: 40,
        wrapCSS: 'mess',
        scrolling : 'no',
        helpers: {
            overlay: {
                locked: false,
                css: {'background': 'rgba(0,0,0,0.6)'}
            }
        },
        tpl: {
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i class="icon close-icn"></i></a>'
        }
    });

    $('.checkbox-colored .colored a').fancybox({
        width: 310,
        mouseWheel: false,
        padding: 40,
        wrapCSS: 'mess',
        scrolling : 'no',
        helpers: {
            overlay: {
                locked: false,
                css: {'background': 'rgba(0,0,0,0.6)'}
            }
        },
        tpl: {
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i class="icon close-icn"></i></a>'
        }
    });


    $('.invoice-wrapper .activate-pro').fancybox({
        width: 310,
        mouseWheel: false,
        padding: 40,
        wrapCSS: 'mess',
        scrolling : 'no',
        helpers: {
            overlay: {
                locked: false,
                css: {'background': 'rgba(0,0,0,0.6)'}
            }
        },
        tpl: {
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i class="icon close-icn"></i></a>'
        }
    });

    $('.fancy-ads .red').click(function(e){
        e.preventDefault();
        $.fn.fancybox.close()
    });

    $('.personal-nav .auth').fancybox({
        width: 310,
        mouseWheel: false,
        padding: 40,
        wrapCSS: 'mess',
        scrolling : 'no',
        helpers: {
            overlay: {
                locked: false,
                css: {'background': 'rgba(0,0,0,0.6)'}
            }
        },
        tpl: {
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i class="icon close-icn"></i></a>'
        }
    });

    /////////////////////////////////////////////// Textarea auto height ///////////////////////////////////////////////

    $('textarea').autosize();
    $('textarea').change(function(){
        $.fancybox.update();
    });

    $('textarea').keyup(function(e){
        $.fancybox.update();
        var code = e.keyCode || e.charCode;
        if(code == 13 || code == 8 || code == 46) {
            $.fancybox.update();
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //$('#carousel').flexslider({
    //    animation: "slide",
    //    controlNav: false,
    //    animationLoop: false,
    //    slideshow: false,
    //    itemWidth: 108,
    //    itemMargin: 0,
    //    asNavFor: '#slider'
    //});
    //
    //$('#slider').flexslider({
    //    animation: "slide",
    //    controlNav: false,
    //    animationLoop: false,
    //    slideshow: false,
    //    sync: "#carousel"
    //});

    /*$('.slides').galleryView({
     //show_panels: false,
     //panel_width: 466,
     //panel_height: 260,
     frame_gap: 4,
     panel_animation: 'crossfade',
     frame_width: 108,
     frame_height: 60,
     show_infobar: false,
     transition_speed: 500,
     enable_slideshow: false,
     overlay_position: 'top',
     //show_filmstrip: false,
     //show_filmstrip_nav: false,
     });*/


    var old_html = $('#slider').html();

    function setGallery(height, width, fr_h, fr_w) {
        $(".slides").galleryView({
            panel_width: width,
            panel_height: height,
            frame_gap: 4,
            panel_animation: 'crossfade',
            frame_width: fr_w,
            frame_height: fr_h,
            show_infobar: false,
            transition_speed: 500,
            enable_slideshow: false,
            overlay_position: 'top',
            pan_images: true,
            frame_opacity: 1,
        });
    }
    setGallery(260, 466, 60, 108);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var increase_img_btn = $('.photos .services-link .btn');
    var small_gallery = $('.photos .gallery-wrapper');
    var fullscreen_overlay = $('<div class="fullscreen-overlay"></div>');
    var close_gallery = $('<a href="#" class="btn red close"><i class="icon close-icn"></i></a>');

    $.fn.exists = function() {return $(this).length;};

    increase_img_btn.click(function(e){
        e.preventDefault();
        $('html').addClass('locked');

        small_gallery.wrap(fullscreen_overlay).delay(2000);

        $('.gv_galleryWrap').remove();
        $('#slider').html(old_html).prepend(close_gallery);
        setGallery(550, 1000, 85, 150);

        if($(close_gallery).exists()) {
            close_gallery.show();
        }

        //$('#slider').prepend(close_gallery);
    });

    close_gallery.click(function(e){
        e.preventDefault();

        $('html').removeClass('locked');
        small_gallery.unwrap(fullscreen_overlay);
        $(this).hide();
        $('.gv_galleryWrap').remove();
        $('#slider').html(old_html).prepend(close_gallery);
        setGallery(260, 466, 60, 108);
        //setTimeout(function(){
        //    $('#carousel').data('flexslider').update();
        //    $('#slider').data('flexslider').update();
        //}, 1000);
    });

    //
    //

    //increase_img_btn.click(function(e){
    //    e.preventDefault();
    //
    //    $('html').addClass('locked');
    //
    //    small_gallery.wrap(fullscreen_overlay).delay(2000);
    //
    //    setTimeout(function(){
    //        $('#carousel').data('flexslider').update();
    //        $('#slider').data('flexslider').update();
    //    }, 1000);
    //
    //    $('#slider').prepend(close_gallery);
    //
    //    if($(close_gallery).exists()) {
    //        close_gallery.show();
    //    }
    //
    //    console.log('click')
    //});


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if($('fieldset').is(".add-photo")){
        var fileSelect = document.getElementById("fileSelect"),
            fileElem = document.getElementById("fileElem");

        fileSelect.addEventListener("click", function(e){
            if (fileElem) {fileElem.click();}
            e.preventDefault();
        }, false);

        $('#fileElem').change(function(){handleFiles(this.files);});

        function handleFiles(files) {


            var res_wrapper = $('#filelist')

            //var list = $('<div class="items"></div>');

            //res_wrapper.append(list);

            for (var i = 0, f; f = files[i]; i++) {

                var reader = new FileReader();

                reader.onload = (function(f) {
                    return function(e) {
                        var li = $('<div class="item"></div>');
                        $(res_wrapper).append(li);
                        var a = $('<a href="#"></a>');
                        $(li).append(a);
                        $(a).append('<img src="'+e.target.result +'"/>');
                        $(li).append('<a href="#remove" class="del btn"></a>');
                    };
                })(f);
                reader.readAsDataURL(f);
            }
        }

        jQuery.fn.live = function (types, data, fn) {
            jQuery(this.context).on(types,this.selector,data,fn);
            return this;
        };

        $('.item .del').live("click", function(event) {
            event.preventDefault();
            $(this).parent().remove();
            reader.load();
            //alert("Handler for .click() called.");
        });

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var settings_wrap = $('.pro-settings-form');
    var check_all = $('.settings-wrapper input[type="checkbox"]');
    var check_item = $('.catalog-list-item input[type="checkbox"]');

    check_all.click(function(){

        var checkedStatus = this.checked;
        settings_wrap.find(':checkbox').each(function () {
            $(this).prop('checked', checkedStatus);
        });

        if(settings_wrap.find('.catalog-list-item :checked').length > 0){
            settings_wrap.find('button[disabled="disabled"]').removeAttr('disabled');
        } else {
            settings_wrap.find('button').attr("disabled", "disabled");
        }
    });

    check_item.on('click', function(){

        if(settings_wrap.find('.catalog-list-item :checked').length > 0){
            settings_wrap.find('button[disabled="disabled"]').removeAttr('disabled');
        } else {
            settings_wrap.find('button').attr("disabled", "disabled");
            check_all.prop('checked', false);
        }

        if ($('.catalog-list-item :checked').length == check_item.length) {
            check_all.prop('checked', true);
        } else {
            check_all.prop('checked', false);
        }
    });



});
