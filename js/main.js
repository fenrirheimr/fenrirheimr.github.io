
$(document).ready(function(){

    ///////////////////////////////////////////////// Tabs ///////////////////////////////////////////////////

    $('ul.tabs a').click(function(e){e.preventDefault();});
    $('ul.tabs').on('click', 'li:not(.current)', function() {
        $(this).addClass('current').siblings().removeClass('current')
            .parents('div.tabs-wrapper').find('div.box').eq($(this).index()).fadeIn().siblings('div.box').hide();
    });
});


