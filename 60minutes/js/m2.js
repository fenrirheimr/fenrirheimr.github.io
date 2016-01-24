var IElte8 ='\v'=='v';

$(function(){
    $('.yandex-map').on('click', ' ul.tabsmap li:not(.current)', function(e) {
        $(this).addClass('current').siblings().removeClass('current')
            .parents('div.apartmens').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();
        e.preventDefault();
    })

    $('.yandex-map').on('click', ' .apartmens .box', function(e){
        location.href = $(this).data("href");

    })

    $(".main-block .read-more-link").click(function(){
        var text_block = $(this).parent(".main-block").find(".text");
        text_block.css("height", "auto");

        return false;
    });

    $("#captcha_refresh").click(function(){
        $.get("/ajax/captcha_refresh.php", function(data){
            $("#sid").val(data);
            $('#code').attr("src", "/bitrix/tools/captcha.php?captcha_sid="+data);
        });
        return false;
    });

    if ($.isFunction($.fn.fancybox)){
        $('.fancy-link').fancybox({padding: 0});
    }

    (function(){
        $('#main').after('<a href="#main" id="up-link"></a>');
        var up = $('#up-link');
        $(window).scroll(function(){
            if($(window).scrollTop() > 610) up.fadeIn('fast');
            else up.fadeOut('fast');
        });
        $(window).resize(function(){
            var bw = $('body').width()
            if(bw < 1200) up.addClass('small');
            else up.removeClass('small');
        }).trigger('resize').trigger('scroll');
        up.click(function(){
            $('body, html').animate({scrollTop: 0}, 300);
            return false;
        });
    })();
    if (IElte8 ){
        $(".nice-box :checked, .nice-radio :checked").each(function() {
            $(this).nextAll().filter("label").first().addClass("checked");
        });
        $(".nice-box input, .nice-radio input").change(function() {
            if ($(this).is(":checked")) {
                $(this).nextAll().filter("label").first().addClass("checked");
            } else {
                $(this).nextAll().filter("label").first().removeClass("checked");
            }
        });

        $(".nice-radio input").change(function() {
            $(this).parents("form").find(".nice-radio input:radio[name='"+$(this).attr("name")+"']").not($(this)).each(function(){
                $(this).nextAll().filter("label").first().removeClass("checked");
            });
        });
    }
    //$('input[placeholder], textarea[placeholder]').placeholder();


      (function(){
        var map = $('.top-map-block');

        $('.map-toggle').click(function(){
            map.height() <= 25 ? map.animate({'height': 400}, 300) : map.animate({'height': 25}, 300);
            $(this).toggleClass('on off');
            return false;
        });
        $('.map-link').click(function(){
            map.animate({'margin-top': 0}, 300);
            $('body, html').animate({scrollTop: 0}, 300);
            return false;
        });

      })();

  //$('.main-slider').rotor({'liquid': true, 'speed': 500});



    (function(){
        var block = $('.main-slider');
        var scrollLeft = block.find('.scroll.left');
        var scrollRight = block.find('.scroll.right');
        var items = block.find('.item').css({opacity:0});

        var current = items.first().addClass('current').css({opacity:1});

        $(window).resize(function(){
            if(block.length>0){
                if ((block.offset().top + block.height() > $(window).height()) || (block.height() < 685)){
                    $('.main-slider, .main-slider .item').height( Math.min(685,Math.max(430, $(window).height() - block.offset().top)) )
                }
            }

        }).trigger('resize');


        function scroll(ele){
            items.filter('.current').animate({opacity: 0}, 1000).removeClass('current');
            current = ele.css('left', 30).animate({opacity: 1, left: 0}, 1000).addClass('current');
            clearInterval(autoscrollInterval);
            autoscrollInterval = setInterval(autoscroll , 5000);
        }
        scrollLeft.click(function(){
            var ele = current.prev().length ?  current.prev() : items.last();
            scroll(ele);
        });
        scrollRight.click(function(){
            var ele = current.next().length ?  current.next() : items.first();
            scroll(ele);
        });

        function autoscroll(){
            scrollRight.trigger('click');
        }
        autoscrollInterval = setInterval(autoscroll , 5000);

    })();

    // $(window).resize(function(){
    //     $('.main-slider .item, .main-slider .item .picture').height(Math.min($(window).height(), 685));
    // }).trigger('resize');
 
//============================================== IF IE8 =========================================

        if (navigator.userAgent.match(/MSIE 8/) !== null) {
          var slideCount = $('.main-slider .items .item').length;
          var slideWidth = $('.main-slider .items .item').width();
          var slideHeight = $('.main-slider .items .item').height();
          var sliderUlWidth = slideCount * slideWidth;
          
          $('.main-slider').css({ width: slideWidth, height: slideHeight });
          
          $('.main-slider .items').css({ width: sliderUlWidth, marginLeft: - slideWidth });
          
          $('.main-slider .items li:last-child').prependTo('.main-slider .items');

          function moveLeft() {
              $('.main-slider .items').animate({
                  left: + slideWidth
              }, 400, function () {
                  $('.main-slider .items li:last-child').prependTo('.main-slider .items');
                  $('.main-slider .items').css('left', '');
              });
          };

          function moveRight() {
              $('.main-slider .items').animate({
                  left: - slideWidth
              }, 400, function () {
                  $('.main-slider .items li:first-child').appendTo('.main-slider .items');
                  $('.main-slider .items').css('left', '');
              });
          };

          $('.main-slider .scroll.left').click(function () {
              moveLeft();
          });

          $('.main-slider .scroll.right').click(function () {
              moveRight();
          });
        }
// ===========================================================================================================

    //if (!IElte8){
    //    $('.slider:not(.apartment-slider)').rotor();
    //    $(".slider.apartment-slider").rotor({
    //        "circular": true,
    //        "rotationInterval": 6000,
    //        "autorotation": true
    //    });
    //
    //}
    

  $('.tabs-block').each(function(){
    if($(this).hasClass("profile"))
        return false;
    var tabBlock = $(this);
    var activeClass = 'active';
    var tabs = $(this).find('.tabs a');
    var blocks = $(this).find('.tab-content');
    
    blocks.first().nextAll().each(function(i,b){
        if ( $(this).is('#goo-tab') ) return false;
        var interval = setInterval( function(){
            if ($(b).find('iframe').length){

                $(b).find('iframe').first().load(function(){
                    $(this).css({'min-height': 300})
                    $(b).hide();
                })
                clearInterval(interval);
            }
        }, 100)


    });

    tabs.click(function(){
        if (tabBlock.is('.social-tabs') && $(this).attr('href') != '#' ) return true;
        if($(this).hasClass("goto-reviews")){
            $("a.show-reviews").trigger("click");
            $('body, html').animate({scrollTop: $(".tabs-flat-second").offset().top}, 300);

        }else if( !$(this).hasClass(activeClass) ){
            var b = $($(this).attr('data-tab-id'));
            tabs.removeClass(activeClass);
            $(this).addClass(activeClass);
            blocks.filter(':visible').fadeOut('fast', function(){b.fadeIn('fast'); if (b.is('#goo-tab') ) gapi.page.go(); });
      }
      return false;

    });
  });

    $(function() {
        $('.tabs-block').each(function(){
            $(this).find('.tab-content').first().nextAll().hide();
        });
    });

  //window.onload =

  //для профиля
  $('.tabs-block').each(function(){
        if(!$(this).hasClass("profile"))
            return false;

        var activeClass = 'active';
        var tabs = $(this).find('.tabs a');
        var blocks = $(this).find('.tab-content');
        //blocks.first().nextAll().hide();
        if(!$.cookie('user_tab_open')){
            blocks.first().nextAll().hide();
            tabs.first().addClass("active");
        }else{
            blocks.each(function(){
                if('#'+this.id == $.cookie('user_tab_open'))
                    $(this).show();
                else
                    $(this).hide();
            });

            tabs.each(function(){
                if($.cookie('user_tab_open') == $(this).attr('data-tab-id'))
                    $(this).addClass("active");
                else
                    $(this).removeClass("active");
            });
        }


        tabs.click(function(){
            if ( !$(this).hasClass(activeClass) ){
                var b = $($(this).attr('data-tab-id'));
                tabs.removeClass(activeClass);
                $(this).addClass(activeClass);
                blocks.filter(':visible').fadeOut('fast', function(){b.fadeIn('fast');});

                //set cookie
                if($(this).attr('data-tab-id'))
                    $.cookie('user_tab_open', $(this).attr('data-tab-id'));

            }
            return false;
        });
    });

    (function(){
        var overlay = $('#overlay');

        $('a.splash-link').click(function(){
            overlay.fadeIn('fast');
            var block = $($(this).attr('href'));
            var top =  (block.css('top') == 'auto') ? $(window).scrollTop() + ( $(window).height() > block.innerHeight() ? ($(window).height() - block.innerHeight()) / 2 : 25 ) : block.css('top');

            block.fadeIn('fast').css({
                'top': top
            });
            if  (block.offset().left+block.outerWidth() > $('#main').width() ){
                block.css({
                    left: 'auto',
                    right: 10,
                    'margin-left' :0
                });
            }

            return false;
        });

        $('.splash-block .close, #overlay').click(function(){
            $('.splash-block').fadeOut('fast').css({
                left: '',
                right: '',
                'margin-left': ''
            });
            $(overlay).fadeOut('fast');
        });
    })();

    (function(){
        var block = $('.apartment .pictures');
        var zoom = block.find('a.zoom');

        var main = block.find('.main-picture img');
        var thumbs = block.find('.thumbs a');
        var virtualLinks = [];

        thumbs.each(function(){
            var img = new Image();
            var bigUrl = $(this).attr('data-big-image');
            img.src = $(this).attr('href');

            var a = document.createElement("a");
            a.href = bigUrl;
            a.rel = 'gallery';
            block.append(a);

            virtualLinks.push(a);

            $(this).click(function(){
                if ( !$(this).hasClass('current') ){
                    thumbs.removeClass('current');
                    $(this).addClass('current');
                    //zoom.attr('href', bigUrl).attr('title', $(this).attr('title'));
                    zoom.attr('data-index', thumbs.index(this))

                    main.fadeOut('fast', function(){
                    main.attr('src', img.src).fadeIn('fast');
                    });
                }
                return false;
            });
        }).first().trigger('click');

        if ($.isFunction($.fn.fancybox)){
            $(virtualLinks).fancybox({
            padding:0,
            nextEffect: 'fade',
            prevEffect: 'fade',
            helpers :{
                title:{
                // type: 'over'
                }
            }
            })
        }
        zoom.click(function(){
            $(virtualLinks[$(this).attr('data-index')]).trigger('click');
            return false;
        })

        $('.apartment .main-picture').click(function(){zoom.trigger('click')});


    })();
     $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3C;Пред',
        nextText: 'След&#x3E;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
        'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $( ".datepicker, .datepickerblue" ).datepicker({
        showOn: "both",
        buttonImage: "/bitrix/templates/innhome/pic/clear.gif",
        buttonImageOnly: true,
        prevText: '',
        nextText: '',
        beforeShow: function(){
            setTimeout(function(){
                $('.ui-datepicker').css('zIndex', '500');
            },100);
            
        }
    });

    if ($.isFunction($.fn.datepicker))
    $( ".datepicker, .datepickerblue" ).datepicker({
        showOn: "both",
        buttonImage: "/bitrix/templates/innhome/pic/clear.gif",
        buttonImageOnly: true,
        prevText: '',
        nextText: '',
        showOtherMonths: true,
        beforeShow: function(){
            setTimeout(function(){
                $('.ui-datepicker').css('zIndex', '500');
            },100);
            
        }
    });

    $('.ui-datepicker').css('zIndex', '500')

    $('.range-block').each(function(){
        var b = $(this);
        var minValue = parseFloat(b.attr('data-range-min-value'), 10);
        var maxValue = parseFloat(b.attr('data-range-max-value'), 10);
        var stepValue = parseFloat(b.attr('data-range-step'), 10);
        var sliderContainer = b.find('.range');
        var inputMin = b.find('input.min');
        var inputMax = b.find('input.max');
        var inputMinValue = parseFloat(inputMin.val(), 10);
        var inputMaxValue = parseFloat(inputMax.val(), 10);

        function checkMinValue(){
            inputMinValue = parseFloat(inputMin.val(), 10);
            if (isNaN(inputMinValue) || inputMinValue < minValue || inputMinValue >= maxValue)  inputMinValue = minValue;
            inputMin.val(inputMinValue);
        }

        function checkMaxValue(){
            inputMaxValue = parseFloat(inputMax.val(), 10);
            if (isNaN(inputMaxValue) || inputMaxValue <= minValue || inputMaxValue > maxValue) inputMaxValue = maxValue;
            inputMax.val(inputMaxValue);
        }

        checkMinValue();
        checkMaxValue();

        sliderContainer.slider({
            min: minValue,
            max: maxValue,
            step: stepValue,
            range: true,
            values: [inputMinValue, inputMaxValue],
            slide: function( event, ui ) {
                inputMin.val(ui.values[0]);
                inputMax.val(ui.values[1]);
                sliderContainer.find('.ui-slider-handle .marker').first().text(ui.values[0]+'р');
                sliderContainer.find('.ui-slider-handle .marker').last().text(ui.values[1]+'р');
            }
        });

        sliderContainer.find('.ui-slider-handle').append('<div class="marker"></div>')
        sliderContainer.find('.ui-slider-handle .marker').first().text(sliderContainer.slider( "option", "values" )[0]+'р');
        sliderContainer.find('.ui-slider-handle .marker').last().text(sliderContainer.slider( "option", "values" )[1]+'р');
    });

    $('a.call-order-link').click(function(){
        $('#call-order-form').fadeToggle('fast');
        $('#call-order-form').find("input").removeClass("error");
        return false;
    });

    $('#call-order-form .close').click(function(){$('a.call-order-link').trigger('click')});


    $(document).on("click", "a.order-btn", function(){

        var form = $(".flat-order-form");

        form.find(".success").hide();

        if($("input.datepicker").length){
            //date_visit = form.find(".date-visit").val();

            //if(date_visit.length<9)
            //form.find(".date-visit").val($("#addtocart .datepicker").val());
        }

        //тут какойнить аякс запрос
        $.ajax({
            url: "/ajax/select_number.php",
            type: "POST",
            data: {id:$(this).data("id")},
            dataType: "json",
            success: function(data){
                form.find(".flat-id").val(data.ID);
                form.find(".title").text(data.NAME);
                form.find("address").text(data.ADDRESS);
                form.find(".picture img").attr("src",data.IMAGE);
                form.find(".price").text(data.PRICE);

                var dv = $("#addtocart").find(".datepicker").val();
                if(dv)
                    form.find(".date-visit").val(dv);
            }
        });

        form.fadeIn('fast').css('top', ($(window).height() - form.outerHeight()) / 2 );
        return false;
    });

    $('#flat-order-form .close').click(function(){$('#flat-order-form').fadeOut('fast')});



});

function checkEmail(email){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if( emailReg.test( email ) ) {
        return true;
    }

    return false;
}

window.send=false;
$(document).on("submit", "form.ajax", function(){

    var print_error = false;
    var form = $(this);

    if($(this).hasClass("print-error"))
        print_error = true;

    el = form.find("input[type='text'], input[type='password'], textarea");
    //console.log(el);
    errors = [];
    console.log(el);
    el.each(function(){
        error = false;
        form.find(".field").removeClass("error");
        form.find("input").removeClass("error");
        form.find(".error-text").remove();

        if($(this).hasClass("check-email")){
            if(!checkEmail($(this).val())){
                error={field:$(this).attr("name"),text:"Неправильный email"};
            }
        }

        //console.log({1:$(this).val().length, 2:$(this).data("min-length") });

        if(!$(this).hasClass("not-required") && $(this).val().length==0 ){
            error={field:$(this).attr("name"),text:"Заполните поле"};

        }else if($(this).data("min-length")>=0 && $(this).val().length<$(this).data("min-length"))
            error={field:$(this).attr("name"),text:"Заполните поле"};

        if ($(this).hasClass('check-phone')) {
            var regV1 = /[^0-9 \(\)\-\+]/gi;
            var bad_phone = $(this).val().match(regV1);
            if(bad_phone){
                error={field: $(this).attr('name'), error:'Укажите корректный номер телефона'};
            }
        }
        if($(this).hasClass('check-date')){
            var text = $(this).val();
            var comp = text.split('.');
            var m = parseInt(comp[1], 10);
            var d = parseInt(comp[0], 10);
            var y = parseInt(comp[2], 10);
            var date = new Date(y,m-1,d);
            if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                //не ранее чем сегодня
                if($(this).hasClass('check-current-date')){
                    var now = new Date();
                    now.setHours(0);
                    now.setMinutes(0);
                    now.setSeconds(0);
                    now.setMilliseconds(0);

                    if(date.getTime()<now.getTime())
                        error={field: $(this).attr('name'), error:'Дата должна быть не раньше сегодняшнего дня'};
                }
            
            } else {
                error={field: $(this).attr('name'), error:'Некорректная дата'};
            }
            
        }
        if($(this).hasClass('check-hh-mm')){
            var text = $(this).val();
            var comp = text.split(':');
            var hh = parseInt(comp[0], 10);
            var mm = parseInt(comp[1], 10);

            if (hh>=0&&hh<24&&mm>=0&&mm<60) {
            } else {
                error={field: $(this).attr('name'), error:'Некорректное время'};
            }
        }

        //console.log(error);

        if(error&&error.field){
            errors.push(error);
        }

    });


    if(errors.length==0){

        if(form.attr("id")=="comments-form"){
            if(!window.send){
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: form.attr("action"),
                    data: form.serialize(),
                    beforeSend: function(){window.send=true;},
                    success: function(data) {
                        form.find(".msg").text(data.msg)
                        if(data.status==0){
                            form.find(".msg").removeClass("error").addClass("success");
                            form.trigger("reset");
                        }else{
                            form.find(".msg").removeClass("success").addClass("error");
                        }
                    },
                    complete: function(){window.send=false;}
                });
            }

            return false;
        }

        if(form.attr("id")=="flat-order-form"){

            //запрос на бронирование квартиры
            var m=form.find(".message");

            if(!window.send){
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/ajax/reserve_number.php",
                    data: form.serialize(),
                    beforeSend: function(){window.send=true;},
                    success: function(data) {
                        if(data.ok){
                            m.removeClass("error");
                            m.addClass("success");
                            m.text("Заявка добавлена");
                            m.show();
                            form.trigger("reset");

                            // Track conversion
                            var google_conversion_id = 968366199;
                            var google_conversion_language = "en";
                            var google_conversion_format = "3";
                            var google_conversion_color = "ffffff";
                            var google_conversion_label = "dJ51CKz5iVgQ97DgzQM";
                            var google_remarketing_only = false;
                            $.getScript( "//www.googleadservices.com/pagead/conversion.js" );
                            
                        }else{
                            m.removeClass("success");
                            m.addClass("error");
                            m.html(data.error);
                            m.show();
                        }
                    },
                    complete: function(){window.send=false;}
                });
            }

            return false;
        }

        //обратный звонок
        if(form.attr("id")=="call-order-form"){

            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/ajax/",
                data: form.serialize(),
                beforeSend: function(){window.send=true},
                success: function(response) {

                    if(response.ok){
                        //$("#status-callorder").html("Заявка отправлена");
                        alert("Заявка отправлена");
                        form.trigger( 'reset' );
                    }else{
                        //$this.find(".form-element").addClass("error");
                    }

                    window.send=false;
                },
            });

            return false;
        }

        if(form.attr("id")=="add-user-bookingman"){

            //запрос на бронирование квартиры
            //var m=form.find(".message");

            if(!window.send){
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/bm/ajax/add_user.php",
                    data: form.serialize(),
                    beforeSend: function(){window.send=true;},
                    success: function(data) {
                        
                        if(data.TYPE=="OK" && data.USER_ID>0){
                            link = '<a href="#" class="btn red-btn round-btn delete-selected-user">&mdash;</a>';
                            $("#selected_user").html(data.MESSAGE+link);
                            $("#user_id").val(data.USER_ID);
                            form.hide();
                            form.trigger("reset");
                        }else{
                            //m.removeClass("success");
                            //m.addClass("error");
                            //m.html(data.error[0]);
                            //m.show();
                        }
                    },
                    complete: function(){window.send=false;}
                });
            }

            return false;
        }

        if(form.attr("id")=="add-new-order"){
            var message_block = $("#add-new-order .message");
            if(!window.send){
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/bm/ajax/add_order.php",
                    data: form.serialize(),
                    beforeSend: function(){window.send=true;},
                    success: function(data) {
                        if(data.ok /*&& data.order_id>0*/){
                            
                            message_block.removeClass("error").addClass("success");
                            message_block.html("Заявка добавлена");

                            form.trigger("reset");
                        }else{
                            message_block.removeClass("success").addClass("error");
                            message_block.html(data.error);
                        }
                    },
                    complete: function(){window.send=false;}
                });
            }

            return false;
        }

        return true;
    }



    $.each(errors, function(key, error){
        if(form.attr("id")=="flat-order-form"){
            form.find("[name='"+error.field+"']").addClass("error");

        }else if(form.attr("id")=="add-new-order"){
            form.find("[name='"+error.field+"']").addClass("error");
        }else if(form.attr("id")=="corporate-client"){
            form.find("[name='"+error.field+"']").addClass("error");



        }
        else{
            form.find("[name='"+error.field+"']").closest(".field").addClass("error");
        }

        if(print_error)
            form.find("[name='"+error.field+"']").after("<span class='error-text'> &mdash; "+error.text+"</span>");



    });



  return false;
});


/*обратный звонок*/
/*(function() {
    var send = false;
    $("#call-order-form").submit(function(){
        var $this = $(this);


        if(!send){
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/ajax/",
                data: $this.serialize(),
                beforeSend: function(){send=true},
                success: function(response) {
                    console.log(response);

                    if(response.ok){
                        $("#status-callorder").html("Заявка отправлена");
                        $this.trigger( 'reset' );
                    }else{
                        //$this.find(".form-element").addClass("error");
                    }

                    send=false;
                },
            });
        }

        return false;
    });

})();*/

$("#addtocart").submit(function(){
    $.ajax({
        url: "/ajax/addtocart.php",
        type: "POST",
        data: $(this).serialize(),
        dataType: "json",
        success: function(data){
            
            //$("#basket_price").html(data.basket_price);
            //$("span.cost").html(data.basket_price);
        }
    });
    alert("test");
    return false;
});



$(function(){
    $(".add_to_favorite").click(function(){
        var link = $(this);
        $.ajax({
            url: "/ajax/add_to_favorite.php",
            type: "POST",
            data: {id:$(this).data("id"), action:"add"},
            dataType: "json",
            success: function(data){
                if(data.result=="ok"){
                    $(".add_to_favorite").each(function(i,el){
                        el = $(el);
                        if(el.data("id")==link.data("id")){
                            el.addClass("active");
                            el.find("img").addClass("active");
                        }
                    });

                }
            }
        });

        return false;
    });
});

$("a.confirm_email").click(function(){
    $.ajax({
        url: "/ajax/confirm_email.php",
        type: "POST",
        dataType: "json",
        success: function(data){
            alert("Проверьте почту");
        }
    });

    return false;
});



$(function(){
    $(".del_favorite").click(function(){

        var cont = $(this).closest(".item");

        $.ajax({
            url: "/ajax/add_to_favorite.php",
            type: "POST",
            data: {id:cont.data("id"), action:"delete"},
            dataType: "json",
            success: function(data){
                
                if(data.result=="ok")
                    cont.hide();
            }
        });

        return false;
    });
});

function set_favorite()
{
    $(".add_to_favorite").addClass("active");
}

function set_favorites()
{
    console.log("заработало");
}



$(function() {

    page_loader = {
        "list": "",
        "b": false,
        "loading":false,
        "current_page": 1,
        "max_page": 1,
        "pager_name": "PAGEN_1",
        "init": function(block){

            if(this.current_page>1)
                return;

            this.b=block;
            b=this.b;

            $(window).scroll(function()
            {
                //  console.log($(document).height());
                // $(document).height() размер контентной части
                // $(window).height() размер окна браузера
                // $(window).scrollTop() - расстояние до верха страницы
                // $(".content .apartments").offset().top абсолютная координата верхушки блока

                //if ($(window).scrollTop() >= $(document).height() - $(window).height() - 300){

                if(b.length>0){
                    if ($(window).scrollTop() >= b.offset().top+b.height()*0.75 ||
                    $(window).scrollTop() >= $(document).height() - $(window).height() - 150
                    ){
                        if(page_loader.max_page>page_loader.current_page)
                            page_loader.load();
                    }

                }

            });


        },
        "load": function(){

            if( !this.loading && this.b.is(':visible') ){

                this.loading=true;

                url = "";
                if(location.search){
                    var re = new RegExp("PAGEN_1=[^&]+","gi");
                    url = location.href.replace(re, "")+"&"+this.pager_name+"="+(this.current_page+1);
                }else{
                    url = location.href+"?"+this.pager_name+"="+(this.current_page+1);
                }

                url = url.replace(location.hash,"").split('#').join('').split('?&').join('?').replace(/&&/gi, "&").split('??').join('?');

                $.ajax({
                    //"url":location.href+"?"+this.pager_name+"="+(this.current_page+1),
                    "url":url,
                    "success":function(result){

                        r = $("<div></div>");
                        r.html(result);

                        if(page_loader.list=="reviews"){
                            page_loader.b.append(r.find("ul.testimonials").html());
                        }else if(page_loader.list=="bm-users"){
                            r.find("ul.header").remove();
                            page_loader.b.append(r.find("ul"));

                        }else if(page_loader.list=="bm-orders"){
                            r.find("ul.header").remove();
                            page_loader.b.append(r.find("ul"));
                        }
                        else
                            page_loader.b.append(r.find("ul").html());

                        page_loader.loading=false;
                        page_loader.current_page++;
                    }
                });

            }
        }


    };


});