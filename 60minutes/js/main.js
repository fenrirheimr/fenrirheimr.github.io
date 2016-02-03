
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
                $(this).tab('show');
            });

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                highlightCurrentDay();
                //e.target // newly activated tab
                //e.relatedTarget // previous active tab
            })

            $('.record .record-inner').tooltip({
                content: function() {
                    var element = $(this).next();
                    var text = element.html();
                    return text;
                }
            });

            $('.service a[title="tooltip"], .bid a[title="tooltip"], .reports a[title="tooltip"]').tooltip({
                tooltipClass:"num-tooltip",
                content: function() {
                    var element = $(this).next();
                    var text = element.html();
                    return text;
                }
            });
            $('a[data-help="tooltip"]').css('color', 'red')
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

            $.datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: '&#x3c;Пред',
                nextText: 'След&#x3e;',
                currentText: 'Сегодня',
                monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                    'Июл','Авг','Сен','Окт','Ноя','Дек'],
                dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
                dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
                dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                isRTL: false
            };
            $.datepicker.setDefaults($.datepicker.regional['ru']);

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
            $('.select-date input').datepicker('setDate', new Date());

            $(document).click(function(e) {
                var ele = $(e.toElement);
                if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !$(ele).parent().parents(".ui-datepicker").length)
                    $(".hasDatepicker").datepicker("hide");
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
            var loginInput = $('.login-wrapper input[type="text"]');
            var passInput = $('.login-wrapper input[type="password"]');

            loginInput.focus(function () {
                $(this).data('placeholder', $(this).attr('placeholder'))
                    .attr('placeholder', '');
            }).blur(function () {
                $(this).attr('placeholder', $(this).data('placeholder'));
            });

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


            $('select').selectbox({
                onOpen: function (inst) {
                    //console.log("open", inst);
                },
                onClose: function (inst) {
                    //console.log("close", inst);
                },
                onChange: function (val, inst) {
                    /*$.ajax({
                        type: "GET",
                        data: {country_id: val},
                        url: "ajax.php",
                        success: function (data) {
                            $("#boxCity").html(data);
                            $("#city_id").selectbox();
                        }
                    });*/
                },
                effect: "slide"
            });

            //////////////////////////////////////////////////////////////

            $.toggleShowPassword = function (options) {
                var settings = $.extend({
                    field: "#password",
                    control: "#toggle_show_password",
                }, options);

                var control = $(settings.control);
                var field = $(settings.field)
                control.click(function(e){
                    $(this).toggleClass('active');
                });
                control.bind('click', function () {
                    if (control.is('.active')) {
                        field.attr('type', 'text');
                    } else {
                        field.attr('type', 'password');
                    }
                })
            };

            $.toggleShowPassword({
                field: '#hiddenpass',
                control: '.visibility'
            });

            //////////////////////////////////////////////////////////////

        },
        scheduler:function(){
            var collapsedLink = $('.collapsed > .caption');

            collapsedLink.click(function(e){
                e.preventDefault();
                $(this).parent().toggleClass('current');
                $(this).next().slideToggle();
            });

            //////////////////////////////////////////////////////////////////////////


            var schedulerWrapper = $('.scheduler');


            var headers = $('.scheduler-header .month-title > div');
            var monthsHolder = $('.scheduler-header .days-name-wrapper .weeks-holder');

            function headersWidth(){

                schedulerWrapper.each(function(){
                    headers.each(function(){
                        var parentLeft = $(this).parents('.weeks').offset().left;
                        var holderLeft = monthsHolder.offset().left;
                        var parentWidth = $(this).parents('.days-name-wrapper').width();
                        var holderWidth = monthsHolder.width();

                        if (parentLeft > holderLeft){
                            $(this).css('left', 0).width(parentWidth);
                        }
                        else{
                            var a = [parentLeft + parentWidth - holderLeft, holderWidth, parentWidth];
                            $(this).offset({left: parentLeft + parentWidth - holderLeft < 250 ?  parentLeft + parentWidth - 250 : holderLeft}).width(Math.min.apply(null,a) );
                        }
                    });
                });

            };
            headersWidth();

            function highlightCurrentDay() {

                schedulerWrapper.each(function(){
                    var thisParent = $(this).parents('.tab-pane');

                    var markCurrentDay = $('<div class="mark-current-day"></div>');


                    if(thisParent.is('.active')){
                        markCurrentDay.appendTo($(this));
                        var currentDay = $('.scheduler-header .current-day');
                        var offsetLeft = currentDay.position().left - currentDay.closest($(this)).position().left+170;
                        var schedulerHeight = $(this).height();

                        markCurrentDay.css({
                            'left': offsetLeft,
                            'height': schedulerHeight-99
                        })
                    }

                });
            };
            highlightCurrentDay();


            //////////////////////////////////////////////////////////////

            function slideMonth() {
                var view = $(".days");
                var holder = view.parent().parent().width();
                var holderWrapper = view.parent().parent().parent().width();
                var sliderLimit = -(holder-holderWrapper);

                var move = "50px";

                var recordsHolder = $('.records-holder')
                var recordsHolderWidth = $('.month-holder').width();
                recordsHolder.width(recordsHolderWidth);

                $(".scheduler-arrow.right").click(function(){
                    headersWidth();
                    var currentPosition = parseInt(view.css("left"));
                    if (currentPosition >= sliderLimit) view.stop(false,true).animate({left:"-="+move},{ duration: 100})


                    var recordPosition = parseInt(recordsHolder.css("left"));
                    if (recordPosition >= sliderLimit) recordsHolder.stop(false,true).animate({left:"-="+move},{ duration: 100})
                    //console.log(recordPosition)
                });

                $(".scheduler-arrow.left").click(function(){
                    headersWidth();
                    var currentPosition = parseInt(view.css("left"));
                    if (currentPosition < 0) view.stop(false,true).animate({left:"+="+move},{ duration: 100})


                    var recordPosition = parseInt(recordsHolder.css("left"));
                    if (recordPosition < 0) recordsHolder.stop(false,true).animate({left:"+="+move},{ duration: 100})
                });
            }

            slideMonth();

            //////////////////////////////////////////////////////////////

            var recordWrapper = $('.records-holder');


            recordWrapper.each(function(){
                var recordItem = $(this).find('.record');

                recordItem.resizable({
                    grid: 25,
                    maxHeight: 50,
                    ghost: true
                });

                recordItem.draggable({
                    connectToSortable: recordWrapper,
                    refreshPositions: true,
                    grid: [ 25, 50 ],
                    cursor: 'move',
                    opacity: 0.7,
                    obstacle: recordItem,
                    preventCollision: true,
                    containment: recordWrapper,
                    //cursorAt: {left: -10, top: -10},

                    drag: function(e, ui) {
                        //ui.position.left = Math.floor(ui.position.left / 10) * 10;
                        //ui.position.top = Math.floor(ui.position.top / 10) * 10;
                    },
                    drop: function(e, ui) {
                        $(this).sortable( "refreshPositions" );
                    }
                });
            });

            //////////////////////////////////////////////////////////////////

        },
        equalHeight:function(){
            var equalBlock = $('.modal label');
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
        }
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);