
(function($) {


    console.log('load')

    $('.circlestat').circliful();

    function diagramLoad() {
        var diagramWrapper = $('.diagram-wrapper');

        diagramWrapper.each(function () {
            var circleText = $(this).find('.circle-text');
            var circlestat = $(this).find('.circlestat');

            circleText.appendTo(circlestat);
        });
    }

    diagramLoad();


})(jQuery);










