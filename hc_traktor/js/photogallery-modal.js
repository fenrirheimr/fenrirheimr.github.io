var modalGalleryObj;
var pageGalleryObj;

$(function () {
    // Показать альбом
    $('body').on('click', '.show-album', function() {
        // установка текущего URL
        historyApi.setCurrentUrl();

        if (historyApi.setUrl($(this).attr('href'))) {
            showAlbum($(this));
            return false;
        }
    });

    // Закрыть альбом
    $('body').on('click', '.g-full-close', function(){
        $('.mg-fill-fon').hide();
        $('.mg-full-block').hide();

        //очистить контент галереи
        $('.galleryContenrWrapper').html('');

        //убрать слушатели
        modalGalleryObj.destroy();

        historyApi.setUrl(photoArticlePath, photoListPageTitle);

        return false;
    });
});

/**
 * Показать фотоальбом
 * @param {jQuery} jLink ссылка, по которой кликнули
 */
function showAlbum(jLink)
{
    $('.mg-fill-fon').show();
    $('.mg-full-block').show();

    //получить контент галереи
    showLoader('');
    $.post(
        '/ajax/getPhotoAlbum.php',
        {
            ALBUM_ID: jLink.data('albumid'),
            IBLOCK_TYPE: jLink.data('itype'),
            IBLOCK_CODE: jLink.data('icode')
        },
        function (data) {
            hideLoader();
            if (data.error404) {
                show404Error();
            }
            else {
                if (data.title) {
                    document.title = data.title;
                }
                if (data.content) {
                    $('.galleryContenrWrapper').html(data.content);

                    modalGalleryObj = new CModalGallery();
                    modalGalleryObj.init('.mg-full-block');
                    StopScrollBodyWhileIn('.mg-full-block');
                }
                $('.albumItem').each(function(){
                   if ($(this).data('href') == document.location.pathname) {
                       $(this).click();
                   }
                });
            }
        },
        'json'
    );
}

//объект для работы с галереей
var CModalGallery = function () {
    var self = this;

    //контекст работы плагина
    this.context;

    this.photoPane = {
        height: 0,
        width: 0
    };

    //ширина превью картинки в слайдере (с отступом)
    this.previewWidth = 148;

    this.init = function (context) {
        self.context = context;

        //клики
        $('.photoGalleryNext', self.context).bind('click', self.next);
        $('.photoGalleryPrev', self.context).bind('click', self.prev);
        $('.scroll-content-item', self.context).bind('click', function () {
            var index = $(this).data('index');
            self.show(index);
            self.changeUrl(index);
        });

        //скролл
        self.scrollbarInit();

        if (self.context == '.mg-full-block') {
            //область для вписывания изображения
            self.getPhotoPane();
        }

        //показать активное изображение
        var activeIndex = 0;
        $('.scroll-content-item', self.context).each(function(n) {
            if ($(this).is('.active')) {
                activeIndex = n;
            }
        });
        $('.scroll-content-item', self.context).removeClass('active').eq(activeIndex).addClass('active');
        self.show(activeIndex);

        if (self.context == '.mg-full-block') {
            //подгоняем размер активной фотки
            $(window).resize(function () {
                self.getPhotoPane();

                var index = $('.scroll-content-item.active', self.context).data('index');
                var wh = self.getPhotoSize(index);
                self.resizeCurrentPhoto(wh);
            });
        }
    };

    // смена url в зависимости от выбранной фотографии
    this.changeUrl = function(index) {
        var link = $('.scroll-content-item', self.context).eq(index);
        if (link.data('href')) {
            // установка текущего URL
            historyApi.setCurrentUrl();

            var href = link.data('href');
            historyApi.setUrl(href, null, null, function(params) {
                // callback-функция при переключении фотографий кнопками вперед/назад
                if (params.full_url) {
                    // выбор фотографии с соответствующим url
                    var photo = $('.scroll-content-item[data-href="' + params.full_url + '"]', self.context);
                    if (photo.length) {
                        console.log(photo.index());
                        self.show(photo.index());
                    }
                }
            });
        }
    };

    //деинициализация фотогалереи
    this.destroy = function () {
        $('.photoGalleryNext', self.context).unbind(' click', self.next);
        $('.photoGalleryPrev', self.context).unbind('click', self.prev);
        $(window).unbind('resize', self.scrollbarResizeEvent);
    };

    //показать следующую фотографию
    this.next = function () {
        var currIndex = $('.scroll-content-item.active', self.context).data('index');
        var maxIndex = $('.scroll-content-item', self.context).length - 1;
        var nextIndex;

        if (currIndex == maxIndex) {
            nextIndex = 0;
        }
        else {
            nextIndex = currIndex + 1;
        }

        self.show(nextIndex);
        self.changeUrl(nextIndex);
    };

    //показать предыдущую фотографию
    this.prev = function () {
        var currIndex = $('.scroll-content-item.active', self.context).data('index');
        var maxIndex = $('.scroll-content-item', self.context).length - 1;
        var nextIndex;

        if (currIndex == 0) {
            nextIndex = maxIndex;
        }
        else {
            nextIndex = currIndex - 1;
        }

        self.show(nextIndex);
        self.changeUrl(nextIndex);
    };

    /**
     * Показывает фотографию при клике на превью или стрелку
     * @param index индекс фотографии в списке
     */
    this.show = function (index) {
        var preview = $('.scroll-content-item', self.context).eq(index);
        var src = preview.data('src');

        //отмечаем активную превьюху
        $('.scroll-content-item', self.context).removeClass('active').eq(index).addClass('active');

        //счётчик фоток
        $('.gsd-count', self.context).text((index + 1) + '/' + $('.scroll-content-item', self.context).length);

        //Название фотки
        var name = preview.data('name');
        $('.gsd-text div', self.context).text(name);

        //автор фотки
        var author = preview.data('author');
        if (author != '') {
            $('.gsd-text span', self.context).show().text('Фото: ' + author);
        }
        else {
            $('.gsd-text span', self.context).hide();
        }

        if (self.context == '.mg-full-block') {
            //получаем размеры фотографии c учётом видимой области
            var wh = self.getPhotoSize(index);

            //создаём объект с нужными параметрами
            var img = $('<img />')
                .attr('src', src)
                .css({width: wh.width + 'px', height: wh.height + 'px'})
                .data('index', index);
            //показываем
            $('.mg-photo-block', self.context).html(img);
        }
        else {
            //создаём объект с нужными параметрами
            var img = $('<img />')
                .attr('src', src)
                .css({width: preview.data('width') + 'px', height: preview.data('height') + 'px'})
                .data('index', index);
            //показываем
            $('.gallery-showed-image', self.context).html(img);
        }

        // скачивание фотографии
        if ($('a.load-photo').length) {
            $('a.load-photo').attr('href', $('a.load-photo').data('href')  + src);
        }

        //двигаем слайдер
        self.movePreview();
    };

    //получить размеры фотографии вписанной в видимую область
    this.getPhotoSize = function (index) {
        var preview = $('.scroll-content-item', self.context).eq(index);

        var origWidth = preview.data('width');
        var origHeight = preview.data('height');

        var origProp = origWidth / origHeight;
        var paneProp = self.photoPane.width / self.photoPane.height;

        //масштабируем фотку, беря за основу нужную сторону
        var newWidth, newHeight;
        if (origProp > paneProp) {
            newWidth = self.photoPane.width;
            newHeight = Math.round(newWidth * origHeight / origWidth);
        }
        else {
            newHeight = self.photoPane.height;
            newWidth = Math.round(newHeight * origWidth / origHeight);
        }

        //если фотка увеличилась - возвращаем родные размеры
        if (newHeight > origHeight) {
            newHeight = origHeight;
            newWidth = origWidth;
        }

        return {width: newWidth, height: newHeight};
    };

    this.resizeCurrentPhoto = function (wh) {
        $('.mg-photo-block img', self.context).css({width: wh.width + 'px', height: wh.height});
    };

    this.scrollbarInit = function () {
        //scrollpane parts
        var scrollPane = $('.scroll-pane', self.context),
            scrollContent = $('.scroll-content', self.context);

        //build slider
        scrollbar = $('.scroll-bar', self.context).slider()
            .on('slide slidechange', function( event, ui ) {
                var sliderRange = scrollContent.width() - scrollPane.width();

                if (scrollPane.width() >= scrollContent.width()) {
                    //ставим контент по середине
                    scrollContent.css('margin-left', Math.round((scrollPane.width() - scrollContent.width())/2));
                }
                else if (sliderRange > 0) {
                    scrollContent.css('margin-left', -Math.round(
                        ui.value / 100 * sliderRange
                    ) + 'px');
                }
                else {
                    //ставим контент по середине
                    scrollContent.css('margin-left', -Math.round(sliderRange/2));
                }
            });

        //append icon to handle
        var handleHelper = scrollbar.find('.ui-slider-handle')
            //BEGIN: магический фикс перетаскивания скрола мышкой
            .mousedown(function() {
                scrollbar.width(handleHelper.width());
            })
            .mouseup(function() {
                scrollbar.width('100%');
            })
            //END

            .append('<span class="ui-icon ui-icon-grip-dotted-vertical"></span>')
            .wrap('<div class="ui-handle-helper-parent"></div>').parent();

        //если мышку отжали за пределами слайдера
        $('body').mouseup(function() {
            scrollbar.width('100%');
        });

        //change overflow to hidden now that slider handles the scrolling
        scrollPane.css('overflow', 'hidden');

        //change handle position on window resize
        $(window).bind('resize', self.scrollbarResizeEvent);
        //init scrollbar size
        setTimeout( self.sizeScrollbar, 10 );//safari wants a timeout
    };

    this.scrollbarResizeEvent = function() {
        if ($('.scroll-pane', self.context).is(':visible') && $('.scroll-bar', self.context).length) {
            self.resetValue();
            self.sizeScrollbar();
            self.reflowContent();
        }
    };

    //size scrollbar and handle proportionally to scroll distance
    this.sizeScrollbar = function () {
        scrollbar = $('.scroll-bar', self.context);
        handleHelper = $('.ui-handle-helper-parent', self.context);

        //scrollpane parts
        var scrollPane = $('.scroll-pane', self.context),
            scrollContent = $('.scroll-content', self.context);

        var remainder = scrollContent.width() - scrollPane.width();
        var proportion = remainder / scrollContent.width();
        var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
        scrollbar.find( ".ui-slider-handle" ).css({
            width: handleSize,
            "margin-left": -handleSize / 2
        });
        handleHelper.width( "" ).width( scrollbar.width() - handleSize );
    };

    //reset slider value based on scroll content position
    this.resetValue = function () {
        scrollbar = $('.scroll-bar', self.context);
        handleHelper = $('.ui-handle-helper-parent', self.context);

        //scrollpane parts
        var scrollPane = $('.scroll-pane', self.context),
            scrollContent = $('.scroll-content', self.context);

        var remainder = scrollPane.width() - scrollContent.width();
        var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
            parseInt( scrollContent.css( "margin-left" ) );

        var percentage = Math.round( leftVal / remainder * 100 );
        scrollbar.slider( "value", percentage );
    };

    //if the slider is 100% and window gets larger, reveal content
    this.reflowContent = function () {
        scrollbar = $('.scroll-bar', self.context);
        handleHelper = $('.ui-handle-helper-parent', self.context);

        //scrollpane parts
        var scrollPane = $('.scroll-pane', self.context),
            scrollContent = $('.scroll-content', self.context);

        var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
        var gap = scrollPane.width() - showing;

        if (scrollPane.width() >= scrollContent.width()) {
            //ставим контент по середине
            scrollContent.css('margin-left', Math.round((scrollPane.width() - scrollContent.width())/2));
        }
        else if ( gap > 0 ) {
            scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
        }
    };

    //передвижение слайдера при листании фоток
    this.movePreview = function () {
        var index = $('.scroll-content-item.active', self.context).data('index');

        //scrollpane parts
        var scrollPane = $('.scroll-pane', self.context),
            scrollContent = $('.scroll-content', self.context);

        //вычисляем, куда сдвинуть слайдер
        var leftVal = - ((index + 1) * self.previewWidth - self.previewWidth / 2 - scrollPane.width() / 2);

        //корректируем
        if (scrollPane.width() >= scrollContent.width()) {
            //ставим контент по середине
            scrollContent.css('margin-left', Math.round((scrollPane.width() - scrollContent.width())/2));
        }
        else if (leftVal > 0) {
            leftVal = 0;
        }
        else if (leftVal < scrollPane.width() - scrollContent.width()) {
            leftVal = scrollPane.width() - scrollContent.width();
        }

        //установить значение
        scrollContent.css('margin-left', leftVal + 'px');
        //дёргаем триггер, чтобы слайдер сдвинулся
        $(window).resize();
    };

    //получить и записать в свойство размеры видимой области
    this.getPhotoPane = function () {
        var width = $(window).width();
        var elementsHeight = $('.album-date', self.context).outerHeight() + $('.album-name', self.context).outerHeight() + parseInt($('.gallery-showed-description', self.context).css('bottom')) + $('.gallery-showed-description', self.context).outerHeight();
        var height = $(window).height() - elementsHeight;

        self.photoPane = {
            width: width,
            height: height
        };
    };
};
