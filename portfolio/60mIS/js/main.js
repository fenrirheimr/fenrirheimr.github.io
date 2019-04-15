
(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.userNav();
            utils.supportPanel();
            utils.autoComplete();
            utils.customJS();
            utils.selectDate();
            utils.scheduler();
            utils.addPhoto();
            utils.validateForm();
            utils.burgerBtn();
            utils.timeSlider();
            utils.bootstrap();
            utils.equalHeight();
            utils.inputMask();
            utils.collapsedBlocks();
            utils.revenueChart();
            utils.collaboratorChart();
        }
    });

    window.Utils = Class.extend({
        init:function(){},

        collaboratorChart:function(){

            if ($('#call-center, #accmen, #contmen').length > 0) {
                var collaboratorOptions = {
                    scaleGridLineColor : "rgba(0,0,0,.05)",
                    responsive: true
                };

                var lineDataCallCenter = {
                    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [28, 48, 40, 19, 86, 27, 90]
                        }
                    ]
                };

                var lineDataAccMen = {
                    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [38, 18, 40, 10, 76, 37, 81]
                        }
                    ]
                };

                var lineDataContMen = {
                    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [58, 48, 40, 60, 86, 47, 94]
                        }
                    ]
                };

                var ctx1 = $("#call-center").get(0).getContext("2d");
                var ctx2 = $("#accmen").get(0).getContext("2d");
                var ctx3 = $("#contmen").get(0).getContext("2d");
                var CallCenter;
                var AccMen;
                var ContMen;

                $('[aria-controls="thisMonth01"]').on('shown.bs.tab', function (e) {
                    CallCenter.destroy();
                });

                $('[aria-controls="halfYear01"]').on('shown.bs.tab', function (e) {
                    CallCenter = new Chart(ctx1).Line(lineDataCallCenter, collaboratorOptions);
                });

                $('[aria-controls="thisMonth02"]').on('shown.bs.tab', function (e) {
                    AccMen.destroy();
                });

                $('[aria-controls="halfYear02"]').on('shown.bs.tab', function (e) {
                    AccMen = new Chart(ctx2).Line(lineDataAccMen, collaboratorOptions);
                });

                $('[aria-controls="thisMonth03"]').on('shown.bs.tab', function (e) {
                    ContMen.destroy();
                });

                $('[aria-controls="halfYear03"]').on('shown.bs.tab', function (e) {
                    ContMen = new Chart(ctx3).Line(lineDataContMen, collaboratorOptions);
                });
            }
        },
        revenueChart:function(){

            if ($('#call-center, #accmen, #contmen').length > 0) {

                var doughnutData = [
                    {
                        value: 800200,
                        color:"#F7464A",
                        highlight: "#FF5A5E",
                        label: "Расчетный счет"
                    },
                    {
                        value: 102600,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "Qiwi"
                    },
                    {
                        value: 87720,
                        color: "#FDB45C",
                        highlight: "#FFC870",
                        label: "Сберкарта"
                    },
                    {
                        value: 36762,
                        color: "#82a4fd",
                        highlight: "#90adf9",
                        label: "Яндекс.Деньги"
                    }
                ]

                var ctx = $("#revenue").get(0).getContext("2d");
                var myNewChart;
                myNewChart = new Chart(ctx).Doughnut(doughnutData, {
                    //responsive: true,
                    //animateScale: true,
                    customTooltips: function (tooltip) {
                        var tooltipEl = $('#chartjs-tooltip');

                        if (!tooltip) {
                            tooltipEl.css({
                                opacity: 0
                            });
                            return;
                        }

                        tooltipEl.removeClass('above below');
                        tooltipEl.addClass(tooltip.yAlign);

                        // split out the label and value and make your own tooltip here
                        var parts = tooltip.text.split(":");
                        var innerHtml = '<span class="chartjs-label">' + parts[0].trim() + '</span>: <span class="chartjs-val"><b>' + parts[1].trim().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '</b> &#8381;</span>';
                        tooltipEl.html(innerHtml);

                        tooltipEl.css({
                            opacity: 1,
                            left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
                            top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
                            //fontFamily: tooltip.fontFamily,
                            fontSize: tooltip.fontSize,
                            fontStyle: tooltip.fontStyle,
                        });
                    },
                    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend list-unstyled\"><% for (var i=0; i<segments.length; i++){%><li class=\"clearfix\"><span class=\"dot pull-left\" style=\"background-color:<%=segments[i].fillColor%>\"></span><span class=\"legend-item-name pull-left\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span><span class=\"legend-item-val pull-right\"><%if(segments[i].value){%><%=segments[i].value%><%}%>  &#8381;</span></li><%}%></ul>"
                });

                document.getElementById('js-legend').innerHTML = myNewChart.generateLegend();

                var cartLegend = $('.legend-item-val');
                cartLegend.each(function(i){
                    var cartLegendVal = cartLegend.eq(i).html().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                    cartLegend.eq(i).html(cartLegendVal);
                });

                $('.chart-block').hide();
            }
        },
        collapsedBlocks:function(){

            var blocks = $('.content-wrapper .blocks');
            var blockItem = blocks.find('.block-item');
            var detailLink = blockItem.find('.detail');
            var hiddenBlock = blockItem.find('.hidden-block');

            if(hiddenBlock.length <= 0) {

            }

            blockItem.each(function(i){
                detailLink.eq(i).click(function(e){
                    e.preventDefault();
                    hiddenBlock.eq(i).slideToggle();
                    $(this).parent().height('auto');
                    //blockItem.eq(i).height('auto');
                    var contrBlock = $(this).parent().find('.contr-wrapper');
                    var chartBlock = $(this).parent().find('.chart-block');

                    if(contrBlock.length > 0) {
                        var curHeight = contrBlock.height(),
                            autoHeight = contrBlock.css('height', 'auto').height();
                        contrBlock.height(curHeight).animate({
                            height: autoHeight == curHeight ? "93px" : autoHeight
                        }, 500);
                    }
                    if(chartBlock.length > 0) {
                        chartBlock.slideToggle();
                    }

                });
            });

            var blockTabs = blocks.find('.tab-wrapper');
            var detailTabLink = blockTabs.find('.detail');
            var hiddenTabBlock = blockTabs.find('.hidden-block');

            blockTabs.each(function(i){
                detailTabLink.eq(i).click(function(e){
                    e.preventDefault();
                    hiddenTabBlock.eq(i).slideToggle();
                    blockTabs.eq(i).height('auto');
                    var contrBlock = blockTabs.eq(i).find('.contr-wrapper');

                    if(contrBlock.length > 0) {
                        var curHeight = contrBlock.height(),
                            autoHeight = contrBlock.css('height', 'auto').height();
                        contrBlock.height(curHeight).animate({
                            height: autoHeight == curHeight ? "93px" : autoHeight
                        }, 500);
                    }

                });
            });


        },
        timeSlider:function(){
            var view = $("#tslshow");
            var move = "105px";

            var totalBrickWidth = 0;

            $('.day').each(function(index) {
                totalBrickWidth += parseInt($(this).width(), 10);
            });

            var totalWidth = totalBrickWidth - $('#viewContainer').width() - 100;

            var sliderLimit = -totalWidth;

            $('.to-right').click(function(){

                var currentPosition = parseInt(view.css("left"));
                if (currentPosition >= sliderLimit) view.stop(false,true).animate({left:"-="+move},{ duration: 400})

            });

            $('.to-left').click(function(){

                var currentPosition = parseInt(view.css("left"));
                if (currentPosition < 0) view.stop(false,true).animate({left:"+="+move},{ duration: 400})
            });

            // TODO: Нужно оборачивать свободные/занятые часы

            var day = $('#tslshow .day');


            day.each(function(){
                var hour = $(this).find('.hour');
                var wrapFree = $('<div class="marked-free" />');
                var wrapOccupied = $('<div class="marked-occupied" />');

                hour.each(function(){
                    var free = $(this).find('.free');
                    var occupied = $(this).find('.occupied');

                    free.wrapAll(wrapFree);
                    occupied.wrapAll(wrapOccupied);

                    if ($(this).children().length > 0 ) {
                        // do something
                    }
                });

            });
        },
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
            $('a[data-help="tooltip"]').css('color', 'red');

            $('.paid a.percent').popover({
                html : true,
                content: function() {
                    return $('.percentContent').html();
                }
            });
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

        autoComplete:function(){
            var availableTags = [
                "Руководитель колл-центра",
                "Руководитель проекта"

            ];

            $('.new-ticket input[name="addressee"]').autocomplete({source: availableTags});


            //////////////////////////////////////////////////////////////

            var headerSearch = [
                "Руководитель колл-центра",
                "Руководитель проекта",
                "Автозаполнение"
            ];

            $('.header-form .form-control').autocomplete({source: headerSearch});




            //$(function () {
            //    var projects = [{
            //        value: "jquery",
            //        label: "jQuery",
            //        desc: "the write less, do more, JavaScript library",
            //    }, {
            //        value: "jquery-ui",
            //        label: "jQuery UI",
            //        desc: "the official user interface library for jQuery",
            //    }, {
            //        value: "sizzlejs",
            //        label: "Sizzle JS",
            //        desc: "a pure-JavaScript CSS selector engine",
            //    }];
            //
            //    $('.ticket-form .hotel-row .form-control').autocomplete({
            //            minLength: 0,
            //            source: projects,
            //            focus: function (event, ui) {
            //                $('.ticket-form .hotel-row .form-control').val(ui.item.label);
            //                return false;
            //            },
            //            select: function (event, ui) {
            //                $('.ticket-form .hotel-row .form-control').val(ui.item.label);
            //                return false;
            //            }
            //        })
            //        .data('autocomplete')._renderItem = function (ul, item) {
            //        return $('<li>')
            //            .data('item.autocomplete', item)
            //            .append('<a>' + item.label + '<br>' + item.desc + '</a>')
            //            .appendTo(ul);
            //    };
            //});
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

            var menuRight = $('.cat-panel');
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

            //////////////////////////////////////////////////////////////

            var tasksPanel = $('.tasks-panel');
            var taskCounter = $('.task-counter');
            var tasksPanelClose = tasksPanel.find('.close');

            //var tasksPanelReset = tasksPanel.find('[type="reset"], [type="submit"]');

            taskCounter.click(function() {
                $(this).toggleClass('active');
                $('.pushmenu-push').toggleClass('pushmenu-push-toright');
                tasksPanel.toggleClass('pushmenu-open');
            });

            tasksPanelClose.click(function() {
                $('.pushmenu-push').removeClass('pushmenu-push-toright');
                tasksPanel.removeClass('pushmenu-open');
            });

            var addUserPanel = $('.add-user-panel');
            var addUser = $('.add-user');
            var addUserPanelClose = addUserPanel.find('.close');
            var addUserPanelReset = addUserPanel.find('[type="reset"]');

            addUser.click(function(e) {
                e.preventDefault();

                $(this).toggleClass('active');
                $('.pushmenu-push').toggleClass('pushmenu-push-toright');
                addUserPanel.toggleClass('pushmenu-open');
            });

            addUserPanelClose.click(function() {
                $('.pushmenu-push').removeClass('pushmenu-push-toright');
                addUserPanel.removeClass('pushmenu-open');
            });
            addUserPanelReset.click(function() {
                $('.pushmenu-push').removeClass('pushmenu-push-toright');
                addUserPanel.removeClass('pushmenu-open');
            });

            $('.task-wrapper').scrollbar();

            //////////////////////////////////////////////////////////////

            var editUserPanel = $('.edit-user-panel');
            var editUser = $('.edit-user');
            var editUserPanelClose = editUserPanel.find('.close');
            var editUserPanelReset = editUserPanel.find('[type="reset"]');

            editUser.click(function(e) {
                e.preventDefault();

                $(this).toggleClass('active');
                $('.pushmenu-push').toggleClass('pushmenu-push-toright');
                editUserPanel.toggleClass('pushmenu-open');
            });

            editUserPanelClose.click(function() {
                $('.pushmenu-push').removeClass('pushmenu-push-toright');
                editUserPanel.removeClass('pushmenu-open');
            });
            editUserPanelReset.click(function() {
                $('.pushmenu-push').removeClass('pushmenu-push-toright');
                editUserPanel.removeClass('pushmenu-open');
            });

            //////////////////////////////////////////////////////////////

            (function ($) {
                $.toggleShowPassword = function (options) {
                    var settings = $.extend({
                        field: "#password",
                        control: "#toggle_show_password",
                    }, options);

                    var control = $(settings.control);
                    var field = $(settings.field)

                    control.bind('click', function () {
                        if (control.is(':checked')) {
                            field.attr('type', 'text');
                        } else {
                            field.attr('type', 'password');
                        }
                    })
                };
            }(jQuery));

            $.toggleShowPassword({
                field: '#hiddenpass',
                control: '#vis1'
            });
            $.toggleShowPassword({
                field: '#hiddenpass2',
                control: '#vis2'
            });



            //////////////////////////////////////////////////////////////

            // Для примера

            $('.pushmenu .btn-primary').click(function(){
                $('.message.success').fadeIn(800).delay(2000).fadeOut(800);
            });

            $('.pushmenu .btn-default').click(function(){
                $('.message.error').fadeIn(800).delay(2000).fadeOut(800);
            });

            //////////////////////////////////////////////////////////////

            var formInput = $('.form-control');

            formInput.focus(function () {
                $(this).data('placeholder', $(this).attr('placeholder'))
                    .attr('placeholder', '');
            }).blur(function () {
                $(this).attr('placeholder', $(this).data('placeholder'));
            });

            var formTextarea = $('textarea');

            formTextarea.focus(function () {
                $(this).data('placeholder', $(this).attr('placeholder'))
                    .attr('placeholder', '');
            }).blur(function () {
                $(this).attr('placeholder', $(this).data('placeholder'));
            });

            //////////////////////////////////////////////////////////////

            //if ($('.new-rules').parentsUntil('.active')) {}

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

            //////////////////////////////////////////////////////////////

            var chb = $('.equipment .checkbox');
            for(var i = 0; i < chb.length; i+=6) {
                chb.slice(i, i+6).wrapAll('<div class="column-wrapper"></div>');
            }

            //////////////////////////////////////////////////////////////

            var idBtn = $('.relevant-rooms-wrapper .item-description .btn[href*="#"]:not([href="#"])');

            idBtn.click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if(!$(target).is(':visible')) {
                        target.show();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }

                    if (target.length) {
                        console.log(target);
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }


                }
            });

            //////////////////////////////////////////////////////////////

            var windowHeiht = $('body').outerHeight();
            var headerHeight = $('.wrapper > header').outerHeight();
            var footerHeight = $('.footer').outerHeight();
            var actualHeight = windowHeiht - (headerHeight+footerHeight);
            var pageContent = $('.content');

            pageContent.css('min-height', actualHeight);

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

            $('.dropdown-menu').click(function(e) {
                e.stopPropagation();
            });

            var dds = $('.tickets > tbody > tr > td.cdd .dropdown .btn > span');

            dds.click(function(e){
                e.preventDefault();
                e.stopPropagation();


                var ddp = $(this).parents('.dropdown .dropdown-menu');
                $('#myModal').modal('show');

                ddp.toggle();
                //$(this).parents().dropdown('toggle');
                //ddp.dropdown('toggle');
                //ddp.css('background', 'red').dropdown('toggle');

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

            // пример работы фильтра

            var filterInput = $('.filer-field .form-control:text');
            var filterClear = $('.filer-field .close');


            var tableRow = $('.tickets tbody tr');
            var tableRowS1 = $('.tickets tbody tr:nth-child(1)');
            var tableRowS2 = $('.tickets tbody tr:nth-child(4)');

            filterInput.keypress(function(){
                var filterInputVal = filterInput.val();
                filterInput.addClass('nofocus');
                if(filterInputVal == 'Апартаменты' || filterInputVal == 'Ап') {
                    tableRow.hide();
                    tableRowS1.show();
                    tableRowS2.show();
                }

            });

            filterClear.click(function(){
                tableRow.show();
                filterInput.removeClass('nofocus');
            });

            //////////////////////////////////////////////////////////////


            $(function () {

                var findRoomInput = $('.find-room .hotel-row .form-group .form-control');

                if ( findRoomInput.length ) {

                    var projects = [{
                        label: " Строгино Экспо",
                        desc: "Отель",
                    }, {
                        label: " Строгино",
                        desc: "Район",
                    }, {
                        label: " Строгино",
                        desc: "Метро",
                    }, {
                        label: " Строительная",
                        desc: "Улица",
                    }];

                    findRoomInput.autocomplete({
                            minLength: 0,
                            source: projects,
                            focus: function (event, ui) {
                                findRoomInput.val(ui.item.desc + ui.item.label);
                                return false;
                            },
                            select: function (event, ui) {
                                findRoomInput.val(ui.item.desc + ui.item.label);
                                return false;
                            },
                            open: function () {
                                $(this).data("uiAutocomplete").menu.element.addClass("find-room");
                            }
                        })
                        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                        return $( "<li>" )
                            .data( "ui-autocomplete-item", item )
                            .append( "<a><span>" + item.desc + "</span> <span>" + item.label + "</span></a>" )
                            .appendTo( ul );
                    };

                }


            });


            //////////////////////////////////////////////////////////////

            $(function () {

                var findRoomInputHeader = $('.header form.header-form .form-control');

                if ( findRoomInputHeader.length ) {

                    var projects = [{
                        label: "Подушкин",
                        desc: " Паспорт для каждого гостя",
                        desc2: " Охраняемая стоянка",
                        desc3: " Оплата Visa, Mastercard",
                        desc4: " С животными нельзя, больше 2-х нельзя",
                        desc5: " Как проехать"

                    }, {
                        label: "Погости",
                        desc: " Паспорт для каждого гостя",
                        desc2: " Охраняемая стоянка",
                        desc3: " Оплата Visa, Mastercard",
                        desc4: " С животными нельзя, больше 3-х нельзя",
                        desc5: " Как проехать"
                    }, {
                        label: "Полярис",
                        desc: " Паспорт для каждого гостя",
                        desc2: " Охраняемая стоянка",
                        desc3: " Оплата Visa, Mastercard",
                        desc4: " С животными нельзя, больше 4-х нельзя",
                        desc5: " Как проехать"
                    }];

                    findRoomInputHeader.autocomplete({
                            minLength: 0,
                            source: projects,
                            focus: function (event, ui) {
                                findRoomInputHeader.val(ui.item.label);
                                return false;
                            },
                            select: function (event, ui) {
                                findRoomInputHeader.val(ui.item.label);
                                return false;
                            },
                            open: function () {
                                $(this).data("uiAutocomplete").menu.element.addClass("find-room-header");
                            }
                        })
                        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                        return $( "<li>" )
                            .data( "ui-autocomplete-item", item )
                            .append( "<a><span>" + item.label + "</span> " +
                                "<span class='hidden-info'>" +
                                "<p>" + item.desc + "</p>"+
                                "<p>" + item.desc2 + "</p>" +
                                "<p>" + item.desc3 + "</p>" +
                                "<p>" + item.desc4 + "</p>" +
                                "<p class='link'>" + item.desc5 + "</p>" + "</span></a>" )
                            .appendTo( ul );
                        // <p class='link'> тут потому что нельзя ссылку помещать в ссылку.
                        // надо будет каким-то образм подставлять location.href в клик по этому пораграфу
                    };

                }


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

            var monthCheck = $('.docs-wrapper .checkbox [type="checkbox"]');
            var downloadBtn = $('.docs-wrapper .downloads');

            monthCheck.click(function(){
                if($(this).prop("checked")) {
                    downloadBtn.show();
                } else {
                    downloadBtn.hide();
                }
            });

            //////////////////////////////////////////////////////////////////

            var phoneCheck = $('.description-wrapper .check-phone [type="checkbox"]');
            var phoneField = $('.description-wrapper .check-phone .phone');

            phoneCheck.click(function(){
                if($(this).prop("checked")) {
                    phoneField.slideDown();
                } else {
                    phoneField.slideUp();
                }
            });

            //////////////////////////////////////////////////////////////////

        },
        equalHeight:function(){
            var equalHCC = $('.hcc-wrapper .hcc-block .hcc-block-header');
            equalHCC.matchHeight();
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
        },
        addPhoto:function(){
            if(($('div').is('.add-photo'))){
                var photoSelect = document.getElementById("photoSelect"),
                    photoElem = document.getElementById("photoElem");

                photoSelect.addEventListener("click", function(e){
                    if (photoElem) {photoElem.click();}
                    e.preventDefault();
                }, false);

                $('#photoElem').change(function(){handleFiles(this.files);});
            }


            function handleFiles(files) {

                var res_wrapper = $('#photolist')

                for (var i = 0, f; f = files[i]; i++) {

                    var reader = new FileReader();

                    reader.onload = (function(f) {
                        return function(e) {
                            var li = $('<div class="item"></div>');
                            $(res_wrapper).append(li);
                            //var a = $('<a href="#"></a>');
                            $(li).append('<img src="'+e.target.result +'"/>');
                            $(li).append('<span class="first"><a href="#fav" class="add-fav"><i class="icn icn24 icn-fav"></i></a></span>');
                            $(li).append('<span class="second"><a href="#remove" class="remove"><i class="icn icn24 icn-remove"></i></a></span>');

                        };
                    })(f);
                    reader.readAsDataURL(f);
                }
            }

            jQuery.fn.live = function (types, data, fn) {
                jQuery(this.context).on(types,this.selector,data,fn);
                return this;
            };

            $('.item .remove').live("click", function(event) {
                event.preventDefault();
                $(this).parents('.item').remove();
                reader.load();
            });

            $('.item .add-fav').live("click", function(event) {
                event.preventDefault();
                $(this).parents('.item').addClass('fav');
                reader.load();
            });
        },
    });

    $(document).ready(function() {
        $('body').data('app', new App());
    });

})(jQuery);