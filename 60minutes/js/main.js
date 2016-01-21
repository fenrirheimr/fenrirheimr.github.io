
(function($, undefined){
    'use strict';

    window.App = Class.extend({
        init: function(){
            var utils = new window.Utils;
            utils.userNav();
            utils.supportPanel();
            utils.customJS();
            utils.datePicker();
            utils.actionSetupWizard();
            utils.validateForm();
            utils.burgerBtn();
            utils.bootstrap();
            utils.equalHeight();
            utils.phoneMask();
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

            var actionTimeRBtn = $('.action-time input[type="radio"]');
            //var actionTimeContent = $('.action-time .action-time-content .atc-item');

            if (actionTimeRBtn.prop( "checked", true )) {
                $(this).parent().css('background', 'red')
            }

            //actionTimeRBtn.on('click', function(){
            //    //actionTimeContent.hide();
            //    console.log('еблысь!!');
            //    $(this).addClass('ok')
            //    if ($(this).prop('checked')){
            //        $(this).parents('.action-time').find('.atc-item').show();
            //    }
            //});

        },
        datePicker:function(){
            $('.report-date input').datepicker({
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
                transitionEffect: "slideLeft",
                onStepChanging: function (event, currentIndex, newIndex)
                {
                    if (currentIndex > newIndex){return true}

                    form.validate().settings.ignore = ":disabled,:hidden";
                    return form.valid();
                },
                onStepChanged: function (event, currentIndex, priorIndex) {
                    $('.done .number').html('<i class="material-icons">&#xE876;</i>')
                    console.log('Change')
                },
                onFinishing: function (event, currentIndex)
                {
                    form.validate().settings.ignore = ":disabled";
                    return form.valid();
                },
                onFinished: function (event, currentIndex)
                {
                    alert("Submitted!");
                }
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

        phoneMask:function(){
            var phoneInput = $('input[type="tel"]');
            phoneInput.mask('+7 (999) 999-9999');
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