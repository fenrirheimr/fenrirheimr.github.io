
(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.userNav();
            utils.supportPanel();
            utils.customJS();
            utils.selectDate();
            utils.actionSetupWizard();
            utils.scheduler();
            utils.validateForm();
            utils.burgerBtn();
            utils.bootstrap();
            utils.equalHeight();
            utils.timeMask();
            utils.customFile();
            utils.collapseLinkText();
            utils.scrollToYear();
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

            $('#reports-tab a').click(function (e) {
                e.preventDefault();
                $(this).tab('show')
            })
        },
        userNav:function(){
            var userLink = $('.user-wrapper .user');
            userLink.click(function(e){
                e.preventDefault();
                var userMenu = $(this).next('.user-menu');

                if (userMenu.css('display') != 'block') {
                    userMenu.show();

                    var yourClick = true;
                    $(document).bind('click.myEvent', function (e) {
                        if (!yourClick && $(e.target).closest('.user-menu').length == 0) {
                            userMenu.hide();
                            $(document).unbind('click.myEvent');
                        }
                        yourClick = false;
                    });
                }

            });
            $('.user-menu li:last').addClass('last');

        },
        supportPanel:function(){
            $('.help-link').on('click', function(e){
                e.preventDefault();
                $('.cd-panel').toggleClass('is-visible');
                $('body').toggleClass('fix');
            });
            $('.cd-panel').on('click', function(e){
                if( $(e.target).is('.cd-panel') || $(e.target).is('.cd-panel-close') ) {
                    $('.cd-panel').removeClass('is-visible');
                    $('body').removeClass('fix');
                    e.preventDefault();
                }
            });
        },
        selectDate:function(){
            $('.report-date input').datepicker({
                showOn: "button",
                buttonImage: "img/calendar.png",
                buttonImageOnly: true,
                buttonText: "Выбрать дату"
            });

            $('.select-date input').datepicker({
                showOn: "button",
                buttonImage: "img/calendar.png",
                buttonImageOnly: true,
                buttonText: "Выбрать дату"
            });
        },
        actionSetupWizard:function(){

            var form = $("#example-form").show();

            form.validate({
                errorPlacement: function errorPlacement(error, element) { element.before(error); },
                rules: {
                    confirm: {
                        equalTo: "#password"
                    }
                }
            });

            form.children("div").steps({
                headerTag: "h3",
                bodyTag: "section",
                transitionEffect: "fade",
                preloadContent: true,

                onInit: function(event, currentIndex){

                    var datePickerInput = $('.wizard .action-date input');
                    datePickerInput.datepicker({
                        showOn: "button",
                        buttonImage: "img/calendar.png",
                        buttonImageOnly: true,
                        buttonText: "Выбрать дату"
                    });

                    var actionTimeRBtn = $('.action-time input[type="radio"]');
                    var actionTimeContent = $('.action-time .action-time-content .atc-item');

                    actionTimeRBtn.each(function(i){
                        var checkedRBtn = actionTimeRBtn.eq(i).prop("checked");

                        if(checkedRBtn) {
                            actionTimeContent.eq(i).show();
                        }

                        actionTimeRBtn.eq(i).on('click', function(){
                            if (actionTimeRBtn.eq(i).prop('checked')){
                                $('.atc-item').hide();
                                actionTimeRBtn.eq(i).parents('.action-time').find('.atc-item').eq(i).fadeIn(300);
                            }
                        });
                    });

                },
                onStepChanging: function (event, currentIndex, newIndex)
                {
                    //if (currentIndex > newIndex){return true}

                    form.validate().settings.ignore = ":disabled,:hidden";
                    return form.valid();
                },
                onStepChanged: function (event, currentIndex, priorIndex) {
                    $('.done .number').html('<i class="material-icons">&#xE876;</i>');
                },
                onFinishing: function (event, currentIndex)
                {
                    form.validate().settings.ignore = ":disabled";
                    return form.valid();

                    $('.actions li:last-child a').addClass('btn btn-success');
                },
                onFinished: function (event, currentIndex)
                {
                    alert("Submitted!");
                }
            });

        },
        customJS:function(){
            var passInput = $('.login-wrapper input[type="password"]');

            passInput.on("focus", function(){
                $(this).parents('.fake-input').addClass('focus');
            });

            passInput.focusout(function(){
                $(this).parents('.fake-input').removeClass('focus');
                if( !this.value ) {
                    $(this).parents('.fake-input').removeClass('notempty');
                }
            });

            passInput.keyup(function(){
                passInput.parents('.fake-input').addClass('notempty');
            });

            //////////////////////////////////////////////////////////////

            var tabSet = $('.table-settings');

            tabSet.click(function(e){
                e.preventDefault();
                var tabSetForm = $('.reports-rows');

                if (tabSetForm.css('display') != 'block') {
                    tabSetForm.show();

                    var yourClick = true;
                    $(document).bind('click.myEvent', function (e) {
                        if (!yourClick && $(e.target).closest('.reports-rows').length == 0) {
                            tabSetForm.hide();
                            $(document).unbind('click.myEvent');
                        }
                        yourClick = false;
                    });
                }

            });

            //////////////////////////////////////////////////////////////

            var collapsedLink = $('.collapsed > .caption');
            //var subMenu = $('.collapsed > .rooms');

            collapsedLink.click(function(e){
                e.preventDefault();
                $(this).parent().toggleClass('current');
                $(this).next().slideToggle();
            });

            //////////////////////////////////////////////////////////////

            $('.scheduler-arrow.right').click(function() {
                event.preventDefault();
                $('.days').animate({
                    marginLeft: "-=150px"
                }, "fast");
            });
            $('.scheduler-arrow.left').click(function() {
                event.preventDefault();
                $('.days').animate({
                    marginLeft: "+=150px"
                }, "fast");
            });


            //var view = $(".days");
            //var move = "50px";
            //var sliderLimit = -500;
            //
            //$(".scheduler-arrow.right").click(function(){
            //    console.log('еблысь вправо!')
            //
            //    var currentPosition = parseInt(view.css("left"));
            //    if (currentPosition >= sliderLimit) view.stop(false,true).animate({left:"-="+move},{ duration: 200})
            //
            //});
            //
            //$(".scheduler-arrow.left").click(function(){
            //    console.log('еблысь влево!')
            //
            //    var currentPosition = parseInt(view.css("left"));
            //    if (currentPosition < 0) view.stop(false,true).animate({left:"+="+move},{ duration: 200})
            //
            //});

        },
        scheduler:function(){

            //$( ".rooms" ).sortable({
            //    revert: true
            //});
            //$( "#draggable" ).draggable({
            //    connectToSortable: ".rooms",
            //    //helper: "clone",
            //    revert: "invalid"
            //});
            //$( "ul, li" ).disableSelection();
            //
            if (navigator.userAgent.indexOf("Opera") != -1) document.getElementsByTagName('body')[0].setAttribute('data-platform', 'opera')

            $(function() {
                /*$.ajaxSetup({
                    mimeType: "text/html; charset=windows-1251"
                })*/

                var scheduler = $('#scheduler');
                var recordsHolder = $('.records-holder');
                var records = scheduler.find('.record');
                var scrolls = scheduler.find('.scroll');
                var grid = $('.scheduler .months-holder .months .table-halves td');
                var monthsBlock = scheduler.find('.months');
                var monthsHolder = scheduler.find('.months-holder');
                var addresses = scheduler.find('.addresses .item');
                var todayBlock = scheduler.find('.today-block');
                var headers = monthsBlock.find('.header');
                var scrollApi, trace = null;

                //подсвечиваем строки при наведении на адресс
                addresses.hover(
                    function(){
                        scheduler.find('tr[data-room="'+$(this).attr('data-room')+'"]').addClass('hover');
                    },
                    function(){
                        scheduler.find('tr[data-room="'+$(this).attr('data-room')+'"]').removeClass('hover');
                    }
                );

                //обработка пересечений и стыковок
                function collision(r1, r2){
                    if (r1.offset().left >= r2.offset().left && r1.offset().left <= r2.offset().left + r2.width()){
                        var q = parseInt((r2.offset().left + r2.width() - r1.offset().left) / records.find('li').width())
                        r2.find('li:gt('+(-q-1)+')').addClass('collision');
                        r1.find('li:lt('+(q)+')').addClass('collision');
                    }

                    if(r2.offset().left+r2.width()+1 == r1.offset().left) r1.addClass('splitter')
                }

                function collisions(){
                    records.each(function(i, record){
                        $(record).removeClass('splitter')
                        $(record).find('li').removeClass('collision')
                        records.filter(function(){
                            return $(this).offset().top == $(record).offset().top;// - 1 && $(this).offset().top <= $(record).offset().top + 1;
                        }).not(this).each(function(){
                            collision( $(this), $(record) )
                            collision( $(record), $(this) )
                        });
                    })
                }

                records.click(function(e){
                    var target = $(e.currentTarget);
                    if(!target.hasClass('afterDrag') ){
                        $('.record-splash-block').remove();
                        var regexp = /state[1-4]/;

                        $.get('ajax/'+regexp.exec(e.currentTarget.className)+'.html', function(data) {
                            $('body').append(data);
                            var block = $('.record-splash-block');
                            block.offset({top: target.offset().top - block.outerHeight() - 2, left: e.pageX-20});
                        },'html');

                    }
                });

                scheduler.after('<div id="record-tip"></div>');
                var tip = $('#record-tip');

                records.draggable({
                    snap: '.scheduler .months-holder .months .table-halves td',
                    snapMode: "inner" ,
                    //grid: [ 23, 23 ],
                    containment: recordsHolder,
                    stack: records,
                    cursor: 'move',
                    scrollSpeed: 10,
                    snapTolerance: 23,
                    start: function(event, ui){
                        trace = ui.helper.clone().removeClass('ui-draggable-dragging').addClass('trace');
                        ui.helper.before(trace);
                        ui.helper.addClass('afterDrag');
                        $('.record-splash-block').remove();
                    },
                    stop: function(event, ui){
                        var o = ui.helper.offset();
                        var td;
                        grid.each(function(index, element){
                            var e = $(element)
                            var eo = e.offset()
                            if (eo.left >= o.left-1 && eo.left <= o.left+1 && eo.top >= o.top-1 && eo.top <= o.top+1) {
                                td = e;
                                return false;
                            }
                        })
                        collisions();

                        if(  (ui.originalPosition.top != ui.position.top || ui.originalPosition.left != ui.position.left) && confirm('Èçìåíèòü?') ){
                            // ui.helper
                            // 	.attr('data-half', td.attr('data-half'))
                            // 	.attr('data-day-no', td.attr('data-day-no'))
                            // 	.attr('data-room', td.parent().attr('data-room'))
                            // 	.attr('data-month-no', td.parents('.month').attr('data-month-no'));
                            ui.helper.addClass('state4').removeClass('state1 state2 state3')
                        }
                        else{
                            ui.helper.offset({left: trace.offset().left, top: trace.offset().top});
                            collisions();
                        }
                        trace.remove();
                        setTimeout(function(){
                            ui.helper.removeClass('afterDrag');
                        },1000)
                        tip.hide();
                    },
                    drag: function(event, ui){
                        var draggable = $(this).data("ui-draggable");
                        $.each(draggable.snapElements, function(index, element) {
                            if (element.snapping) {
                                draggable._trigger("snapped", event, $.extend({}, ui, {
                                    snapElement: $(element.item)
                                }));
                                return false;
                            }
                        });

                    },
                    snapped: function(event, ui){
                        collisions();
                        var right = monthsHolder.offset().left + monthsHolder.width() - ui.helper.offset().left - ui.helper.width();
                        var left = monthsHolder.offset().left - ui.helper.offset().left;

                        if (ui.helper.find('li').length < 18){
                            if (right < 0) scrollApi.scrollByX(-right, false);
                            if (left > 0 ) scrollApi.scrollByX(-left, false);
                        }
                        else{
                            var e = ui.snapElement.position().left ? ui.snapElement.next() : ui.snapElement;
                            if (left > 0 ) tip.text('Íà÷èíàÿ ñ:'+ e.attr('data-day-no')+e.parents('.month').find('.header').text()).offset({left: event.pageX + 10, top: event.pageY - 30}).show();
                        }


                    }
                });

                function headersWidth(){
                    headers.each(function(){
                        var parentLeft = $(this).parent().offset().left;
                        var holderLeft = monthsHolder.offset().left;
                        var parentWidth = $(this).parent().width();
                        var holderWidth = monthsHolder.width();

                        if (parentLeft > holderLeft){
                            $(this).css('left', 0).width(holderLeft + holderWidth - parentLeft);
                        }
                        else{
                            var a = [parentLeft + parentWidth - holderLeft, holderWidth, parentWidth];
                            $(this).offset({left: parentLeft + parentWidth - holderLeft < 250 ?  parentLeft + parentWidth - 250 : holderLeft}).width(Math.min.apply(null,a) );
                        }
                    });
                }

                function init(){
                    recordsHolder.height($('.table-halves').outerHeight()).css({'bottom': 'auto'})
                    todayBlock.height($('.table-halves').height()+$('.table-dates').height()).offset({left: scheduler.find('td.today').offset().left});

                    //monthsHolder.jScrollPane({
                    //    horizontalGutter : 0,
                    //    verticalGutter : 0
                    //}).bind('jsp-scroll-x',function(event, scrollPositionX, isAtLeft, isAtRight){
                    //    headersWidth()
                    //});
                    //
                    //scrollApi = monthsHolder.data('jsp');
                    //
                    //scrollApi.scrollByX(todayBlock.position().left, 300)
                    //
                    //scrolls.click(function(){
                    //    if($(this).hasClass('next')) scrollApi.scrollByX(monthsHolder.width(), 300)
                    //    else scrollApi.scrollByX(-monthsHolder.width(), 300)
                    //});

                    records.each(function(){
                        var r = $(this);
                        var correction = 1;
                        var td = monthsBlock.find('.month[data-month-no="'+r.attr('data-month-no')+'"]')
                            .find('.addr[data-room="'+r.attr('data-room')+'"]')
                            .find('td[data-day-no="'+r.attr('data-day-no')+'"][data-half="'+r.attr('data-half')+'"]')
                        r.offset({left: td.offset().left, top: td.offset().top+1})
                    });

                    collisions();
                }

                init()


                $('.records-holder, .record-splash-block .cancel-btn').on('click', function(){
                    $('.record-splash-block').remove();
                    return false;
                });
            });
        },
        equalHeight:function(){
            var equalBlock = $('[class^=col-] .block');
            equalBlock.matchHeight();
        },
        validateForm:function(){

            $('#login-form').validate({

                errorClass: "error",
                rules : {
                    login: {
                        required : true
                    },
                    pass: {
                        required : true
                    }
                },
                highlight: function(element, errorClass, showErrors) {
                    $(element).parent().addClass(errorClass);
                    //$(".error-mess").text('Заполните все поля!');
                },
                unhighlight: function(element, errorClass, showErrors) {
                    $(element).parent().removeClass(errorClass);
                    //$(".error-mess").text('');
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

        timeMask:function(){
            var timeMask = $('.day .form-control');
            timeMask.mask("99:99",{placeholder:"00:00"});
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