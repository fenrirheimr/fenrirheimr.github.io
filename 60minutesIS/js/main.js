
(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.userNav();
            utils.supportPanel();
            utils.customJS();
            utils.selectDate();
            utils.scheduler();
            utils.validateForm();
            utils.burgerBtn();
            utils.bootstrap();
            utils.equalHeight();
            utils.inputMask();
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

            $('.record .record-inner').tooltip({
                content: function() {
                    var element = $(this).next();
                    var text = element.html();
                    return text;
                }
            });

            $('.service a[title="tooltip"], .bid a[title="tooltip"], .reports a[title="tooltip"], .reports span[title="tooltip"], .total-price span[title="tooltip"]').tooltip({
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

            var selectDate = $('.select-date input');

            selectDate.datepicker({
                //defaultDate: new Date(),
                showOn: "button",
                buttonImage: "img/calendar.png",
                buttonImageOnly: true,
                buttonText: "Выбрать дату",
                onSelect: function(date) {
                    var thisLabel = $(this).prev('label');
                    var labelText = thisLabel.text();
                    var todayLink = $('<a href="#">'+labelText+'</a>');
                    todayLink.insertBefore($(this));
                    thisLabel.remove();
                    todayLink.click(function(e){
                        e.preventDefault();
                        $(this).remove();
                        thisLabel.insertBefore(selectDate);
                        selectDate.datepicker('setDate', new Date());
                    })
                },
            }).datepicker('setDate', new Date());


            $(document).click(function(e) {
                var ele = $(e.toElement);
                if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !$(ele).parent().parents(".ui-datepicker").length)
                    $(".hasDatepicker").datepicker("hide");
            });

        },

        customJS:function(){

            //////////////////////////////////////////////////////////////

            var discountLink = $('.discount .add-discount');

            discountLink.click(function(e){
                e.preventDefault();
                $(this).hide();
                $(this).siblings('.discount-list').show().css("display", "inline-block");
            });

            //////////////////////////////////////////////////////////////

            // Для примера

            $('.rooms .btn-gray').click(function(){
                $('.message.success').fadeIn(800).delay(2000).fadeOut(800);
            });

            $('.rooms .btn-danger').click(function(){
                $('.message.error').fadeIn(800).delay(2000).fadeOut(800);
            });

            //////////////////////////////////////////////////////////////

            $('.add-ticket').click(function(e) {
                e.preventDefault();
                var nt = $('.new-ticket');
                var ntForm = nt.find('form');
                var ntFormInput = ntForm.find('input');
                var ntFormReset = ntForm.find('[type="reset"]');
                var close = nt.find('.icn-close');

                nt.show();
                close.click(function(e){
                    nt.hide();
                    ntForm.trigger('reset');
                    ntFormInput.removeClass('used');
                });
                ntFormReset.click(function(e){
                    nt.hide();
                    ntForm.trigger('reset');
                    ntFormInput.removeClass('used');
                });
            });

            $('.material input').blur(function() {
                var $this = $(this);
                if ($this.val())
                    $this.addClass('used');
                else
                    $this.removeClass('used');
            });

            $('.textarea-scrollbar').scrollbar();

            var availableTags = [
                "Руководитель колл-центра",
                "Руководитель проекта"

            ];

            $('.new-ticket input[name="addressee"]').autocomplete({source: availableTags});


            //////////////////////////////////////////////////////////////

            if($('fieldset').is('.add-file')){
                var fileSelect = document.getElementById('fileSelect'),
                    fileElem = document.getElementById('fileElem');

                fileSelect.addEventListener('click', function(e){
                    if (fileElem) {fileElem.click();}
                    e.preventDefault();
                }, false);

                $('#fileElem').change(function(event) {
                    var files = this.files;
                    var i = 0,
                        len = files.length;
                    (function readFile(n) {
                        var reader = new FileReader();
                        var f = files[n];
                        reader.onload = function(e) {
                            //console.log(f.name);
                            var item = $('<span class="file-item">' + f.name + '</span>');
                            item.append('<a href="#remove" class="del-btn"><i class="icn icn20 icn-remove"></i></a>');
                            item.appendTo("#filelist");
                            // if `n` is less than `len` ,
                            // call `readFile` with incremented `n` as parameter
                            if (n < len -1) readFile(++n)
                        };
                        reader.readAsDataURL(f); // `f` : current `File` object
                    }(i)); // `i` : `n` within immediately invoked function expression
                });

                $.fn.live = function (types, data, fn) {
                    $(this.context).on(types,this.selector,data,fn);
                    return this;
                };

                $('.file-item .del-btn').live("click", function(event) {
                    event.preventDefault();
                    $(this).parent().remove();
                    //reader.load();
                });
            }

            if($('fieldset').is('.new-mess')){
                var fileSelect2 = document.getElementById('fileSelect2'),
                    fileElem2 = document.getElementById('fileElem2');

                fileSelect2.addEventListener('click', function(e){
                    if (fileElem2) {fileElem2.click();}
                    e.preventDefault();
                }, false);

                $('#fileElem2').change(function(event) {
                    var files = this.files;
                    var i = 0,
                        len = files.length;
                    (function readFile(n) {
                        var reader = new FileReader();
                        var f = files[n];
                        reader.onload = function(e) {
                            //console.log(f.name);
                            var item = $('<span class="file-item">' + f.name + '</span>');
                            item.append('<a href="#remove" class="del-btn"><i class="icn icn20 icn-remove"></i></a>');
                            item.appendTo("#filelist2");
                            // if `n` is less than `len` ,
                            // call `readFile` with incremented `n` as parameter
                            if (n < len -1) readFile(++n)
                        };
                        reader.readAsDataURL(f); // `f` : current `File` object
                    }(i)); // `i` : `n` within immediately invoked function expression
                });

                $.fn.live = function (types, data, fn) {
                    $(this.context).on(types,this.selector,data,fn);
                    return this;
                };

                $('.file-item .del-btn').live("click", function(event) {
                    event.preventDefault();
                    $(this).parent().remove();
                    //reader.load();
                });
            }

            //////////////////////////////////////////////////////////////

            var newMessBtn = $('.button-bar .reply-btn');

            newMessBtn.click(function(){
               $(this).parents('form').find('.new-mess').slideToggle();
            });

            //////////////////////////////////////////////////////////////

            var menuRight = $('.pushmenu-right');
            var nav_list = $('.add-category');
            var menuClose = menuRight.find('.close');
            var menuReset = menuRight.find('[type="reset"], [type="submit"]');

            nav_list.click(function() {
                $(this).toggleClass('active');
                $('.pushmenu-push').toggleClass('pushmenu-push-toright');
                menuRight.toggleClass('pushmenu-open');
            });

            menuClose.click(function() {
                $('.pushmenu-push').removeClass('pushmenu-push-toright');
                menuRight.removeClass('pushmenu-open');
            });
            menuReset.click(function() {
                $('.pushmenu-push').removeClass('pushmenu-push-toright');
                menuRight.removeClass('pushmenu-open');
            });

            // Для примера

            $('.pushmenu .btn-primary').click(function(){
                $('.message.success').fadeIn(800).delay(2000).fadeOut(800);
            });

            $('.pushmenu .btn-default').click(function(){
                $('.message.error').fadeIn(800).delay(2000).fadeOut(800);
            });



            //////////////////////////////////////////////////////////////

            var formElement = $('.form-control');

            formElement.focus(function () {
                $(this).data('placeholder', $(this).attr('placeholder'))
                    .attr('placeholder', '');
            }).blur(function () {
                $(this).attr('placeholder', $(this).data('placeholder'));
            });

            //////////////////////////////////////////////////////////////

            if ($('.new-rules').parents('.active').length) {
                var rulesWrapper = $('.new-rules').siblings('.checkbox-group');
                var addNewRules = $('.new-rules .btn-default');

                addNewRules.click(function(){
                    var rulesCheckbox = $('.checkbox-group .checkbox');
                    var input = $('.new-rules .form-control');
                    var inputVal = input.val();

                    for (var i = rulesCheckbox.length; i <= rulesCheckbox.length; i++) {
                        rulesWrapper.append('<div class="checkbox"><input type="checkbox" id="residenceRules'+ (i+1) +'" value="">' +
                            '<label for="residenceRules'+(i+1) +'">'+inputVal+'</label></div>');
                    }

                    input.val('');

                });
            }

            //////////////////////////////////////////////////////////////

            var chb = $('.equipment .checkbox');
            for(var i = 0; i < chb.length; i+=6) {
                chb.slice(i, i+6).wrapAll('<div class="column-wrapper"></div>');
            }

            //////////////////////////////////////////////////////////////

            var statusRadio = $('.status [type="radio"]');
            var commissionRadio = $('#commissionRadio');

            statusRadio.click(function(){
                if( commissionRadio.prop("checked")) {
                    $('.commission-wrapper').show();
                } else {
                    $('.commission-wrapper').hide();
                }
            });

            //////////////////////////////////////////////////////////////

            /*$('.dropdown-menu a, .dropdown-menu label').click(function(e) {
                e.stopPropagation();
            });*/

            $('.dropdown-menu').click(function(e) {
                e.stopPropagation();
            });

            //////////////////////////////////////////////////////////////

            //var firstRow = $('.sbOptions li:first-child');
            $('select').selectbox({
                onOpen: function (inst) {
                    //firstRow.hide();
                },
                onClose: function (inst) {
                    //firstRow.show();
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
                $(this).parent().toggleClass('show');
                $(this).next().slideToggle();
            });

            //////////////////////////////////////////////////////////////////////////


            var schedulerWrapper = $('.scheduler');


            var headers = $('.scheduler-header .month-title > div');
            var monthsHolder = $('.scheduler-header .days-name-wrapper .weeks-holder');

            function headersWidth(){
            // что-то пошло не так
                schedulerWrapper.each(function(){
                    headers.each(function(){
                        var parentLeft = $(this).parents('.weeks').offset().left;
                        var holderLeft = monthsHolder.offset().left -156;
                        var parentWidth = $(this).parents('.days-name-wrapper').width() + 156;
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

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                headersWidth();
            });

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

            jQuery.extend(jQuery.validator.messages, {
                required: "необходимо заполнить",
                //remote: "Please fix this field.",
                //email: "Please enter a valid email address.",
                //url: "Please enter a valid URL.",
                //date: "Please enter a valid date.",
                //dateISO: "Please enter a valid date (ISO).",
                number: "Только цифры",
                //digits: "Please enter only digits.",
                //creditcard: "Please enter a valid credit card number.",
                //equalTo: "Please enter the same value again.",
                //accept: "Please enter a value with a valid extension.",
                //maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
                //minlength: jQuery.validator.format("Please enter at least {0} characters."),
                //rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
                //range: jQuery.validator.format("Please enter a value between {0} and {1}."),
                //max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
                //min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
            });

            $('#hotelSettings').validate({

                errorClass: "error",
                rules : {
                    kor: {
                        required : true
                    },
                    bank: {
                        required : true
                    }
                },
                messages: {
                    kor: "Что за номер такой?",
                    bank: "Нет такого банка"
                },
                errorElement: "span",
                highlight:
                    function(element, errorClass, showErrors) {
                    $(element).parent().addClass(errorClass);
                    //$(".error-mess").text('Что за номер такой?');
                },
                unhighlight: function(element, errorClass, showErrors) {
                    $(element).parent().removeClass(errorClass);
                    //$(".error-mess").text('');
                },
                errorPlacement: function(error,element) {
                    error.insertAfter(element)
                }

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

        inputMask:function(){
            //var timeMask = $('.day .form-control');
            //timeMask.mask("99:99",{placeholder:"00:00"});

            var phoneInput = $('.phone [type="tel"]');
            phoneInput.mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
        }
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);