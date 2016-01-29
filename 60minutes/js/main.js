
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





        },
        scheduler:function(){
            var collapsedLink = $('.collapsed > .caption');

            collapsedLink.click(function(e){
                e.preventDefault();
                $(this).parent().toggleClass('current');
                $(this).next().slideToggle();
            });

            //////////////////////////////////////////////////////////////////////////

            var headers = $('.scheduler-header .month-title > div');
            var monthsHolder = $('.scheduler-header .days-name-wrapper .weeks-holder');

            function headersWidth(){
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
            };
            headersWidth();

            //////////////////////////////////////////////////////////////

            function slideMonth() {
                var view = $(".days");
                var holder = view.parent().parent().width();
                var holderWrapper = view.parent().parent().parent().width();
                var sliderLimit = -(holder-holderWrapper);

                var move = "50px";
                headersWidth();

                var recordsHolder = $('.records-holder')
                var recordsHolderWidth = $('.month-holder').width();
                recordsHolder.width(recordsHolderWidth);

                $(".scheduler-arrow.right").click(function(){
                    var currentPosition = parseInt(view.css("left"));
                    if (currentPosition >= sliderLimit) view.stop(false,true).animate({left:"-="+move},{ duration: 100})
                    headersWidth();

                    var recordPosition = parseInt(recordsHolder.css("left"));
                    if (recordPosition >= sliderLimit) recordsHolder.stop(false,true).animate({left:"-="+move},{ duration: 100})
                    //console.log(recordPosition)
                });

                $(".scheduler-arrow.left").click(function(){
                    headersWidth();
                    var currentPosition = parseInt(view.css("left"));
                    if (currentPosition < 0) view.stop(false,true).animate({left:"+="+move},{ duration: 100})
                    headersWidth();

                    var recordPosition = parseInt(recordsHolder.css("left"));
                    if (recordPosition < 0) recordsHolder.stop(false,true).animate({left:"+="+move},{ duration: 100})
                });
            }

            slideMonth();

            //////////////////////////////////////////////////////////////

            function records() {
                var recordItem = $('.records-holder .record');

                $('.scheduler').each(function(){
                    var dayRow = $('.table-wrapper .days tr');
                    var records = dayRow.find('td[data-record-num]');

                    //console.log(records);
                    var recordVal =[];
                    records.each(function(i){
                        recordVal = $(this).data('recordNum');
                        $(this).addClass('rec-'+ recordVal).html('<div>'+recordVal+'</div>');

                        var firstElem = $('[class*="rec-'+recordVal+'"]');
                        firstElem.css('background', 'red');




                        //console.log(recordLength);

                        recordItem.each(function(){
                            var starPosTop = firstElem.parents('.table-wrapper tr').position().top;
                            var starPosLeft = firstElem.position().left;

                            var relevantRecord = recordItem.eq(i).attr('data-record');
                            var currentLength = $('[data-record-num*="'+recordVal+'"]');
                            var recordLength = currentLength.eq(i).length;

                            var thisWidth = 0;
                            var totalWidth = 0;

                            $(this).each(function() {
                                thisWidth += parseInt($(this).width(), 10);
                                totalWidth = thisWidth*recordLength;
                            });

                            if(recordItem.eq(i).data('record') === recordVal) {
                                $('.records-holder .record[data-record = '+relevantRecord+']').css({
                                    'top': starPosTop,
                                    'left': starPosLeft,
                                    'width': totalWidth
                                });
                            }

                            console.log(starPosTop, starPosLeft);

                        });

                    });


                    //var tempLength = $().length;
                    //
                    //console.log(tempLength);

                    //recordItem.each(function(){
                    //
                    //    var hasRecord = !!dayBlocks.data('record-num');
                    //    console.log(hasRecord);
                    //
                    //
                    //    if (hasRecord){
                    //        var recordVal = $(this).data('record-num');
                    //        $(this).addClass('rec-'+ recordVal);
                    //
                    //        var rec = $('.table-wrapper .days td[class*="rec-'+recordVal+'"]');
                    //        console.log(recordVal);
                    //
                    //        //.each(function(){
                    //        //
                    //        //});
                    //
                    //        /*firstElement.each(function(i){
                    //
                    //         var starPosTop = firstElement.parents('.table-wrapper tr').position().top;
                    //         var starPosLeft = firstElement.position().left;
                    //         var relevantRecord = recordItem.eq(i).attr('data-record');
                    //
                    //         var thisWidth = 0;
                    //         var totalWidth = 0;
                    //         var recordLength = $('.days td[class*="rec-'+recordVal+'"]').length;
                    //
                    //         $(this).each(function() {
                    //         thisWidth += parseInt($(this).width(), 10);
                    //         totalWidth = thisWidth*recordLength;
                    //         });
                    //
                    //         if(recordItem.eq(i).data('record') === recordVal) {
                    //         $('.records-holder .record[data-record = '+relevantRecord+']').css({
                    //         'top': starPosTop,
                    //         'left': starPosLeft,
                    //         'width': totalWidth
                    //         });
                    //         }
                    //
                    //         //recordItem.resizable({
                    //         //    grid: 50,
                    //         //    maxHeight: 50,
                    //         //});
                    //         //
                    //         //recordItem.sortable({
                    //         //    revert: true
                    //         //});
                    //         //recordItem.draggable({
                    //         //    connectToSortable: ".records-holder",
                    //         //    grid: [ 50, 50 ],
                    //         //    //helper: "clone",
                    //         //    cursor: 'move',
                    //         //    obstacle: recordItem,
                    //         //    preventCollision: true,
                    //         //    containment: ".records-holder"
                    //         //});
                    //
                    //
                    //         ////////////////////////////////////////////////////////////////////
                    //
                    //         //var selectedClass = 'ui-state-highlight',
                    //         //    clickDelay = 600,
                    //         //// click time (milliseconds)
                    //         //    lastClick, diffClick; // timestamps
                    //         //
                    //         //recordItem.bind('mousedown mouseup', function(e) {
                    //         //        if (e.type == "mousedown") {
                    //         //            lastClick = e.timeStamp; // get mousedown time
                    //         //        } else {
                    //         //            diffClick = e.timeStamp - lastClick;
                    //         //            if (diffClick < clickDelay) {
                    //         //                // add selected class to group draggable objects
                    //         //                $(this).toggleClass(selectedClass);
                    //         //            }
                    //         //        }
                    //         //    })
                    //         //    .draggable({
                    //         //        revertDuration: 10,
                    //         //        opacity: 0.7,
                    //         //        // grouped items animate separately, so leave this number low
                    //         //        containment: '.rooms-wrapper',
                    //         //        start: function(e, ui) {
                    //         //            ui.helper.addClass(selectedClass);
                    //         //        },
                    //         //        stop: function(e, ui) {
                    //         //            // reset group positions
                    //         //            $('.' + selectedClass).css({
                    //         //                top: 0,
                    //         //                left: 0
                    //         //            });
                    //         //        },
                    //         //        drag: function(e, ui) {
                    //         //            // set selected group position to main dragged object
                    //         //            // this works because the position is relative to the starting position
                    //         //            $('.' + selectedClass).css({
                    //         //                top: ui.position.top,
                    //         //                left: ui.position.left
                    //         //            });
                    //         //        }
                    //         //    });
                    //         //
                    //         //$(".records-holder").sortable().droppable({
                    //         //    drop: function(e, ui) {
                    //         //        $('.' + selectedClass).appendTo($(this)).add(ui.draggable) // ui.draggable is appended by the script, so add it after
                    //         //            .removeClass(selectedClass);
                    //         //    }
                    //         //});
                    //
                    //         });*/
                    //
                    //    }
                    //
                    //
                    //    //rec.each(function(){
                    //    //
                    //    //    var firstElement = $('.table-wrapper .days td[class*="rec-'+recordVal+'"]').first();
                    //    //    var elementLength = $(this).length;
                    //    //    var recWidth = elementLength*50;
                    //    //
                    //    //    firstElement.css('background', 'red').html('<div>'+recordVal+'</div>');
                    //    //
                    //    //    var starPosTop = firstElement.position().top;
                    //    //    var starPosLeft = firstElement.position().left;
                    //    //
                    //    //    //console.log(recWidth);
                    //    //});
                    //
                    //
                    //});
                });
            }
            records();


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