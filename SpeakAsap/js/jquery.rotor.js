
jQuery.fn.rotor = function(options){
  // настройки по умолчанию
  var options = jQuery.extend({
    itemsBlockSelector : '.items',
    itemSelector : '.item',
    scrollLeftSelector : '.scroll.left',
    scrollRightSelector : '.scroll.right',
    liquid: false,
    speed : false,
    circular: false,
    autorotation: false,
    rotationInterval: 5000,
    mouseoverStop: true
  }, options);
  return this.each(function() {
    
    var widget = jQuery(this);
    var itemsBlock = widget.find(options.itemsBlockSelector);
    var items = itemsBlock.find(options.itemSelector);
    var scrollLeft = widget.find(options.scrollLeftSelector);
    var scrollRight = widget.find(options.scrollRightSelector);
    var itemWidth = items.outerWidth() + parseInt(items.css('margin-right'));

    if ( !options.speed) options.speed =  (itemWidth / 4 < 300 ) ? 300 : itemWidth / 4;
    
    items.css('margin-left', 0);
    function dimention(){
      items.width(widget.width()).css('margin-right', 0);
      itemWidth = items.width();
      itemsBlock.width(items.outerWidth() * items.size()).css('left', Math.round(parseInt(itemsBlock.css('left'))/itemWidth)*itemWidth);
    }
    
    if (options.liquid){
      dimention();
      $(window).resize(dimention);
    }
    
    if (!options.circular) {
        itemsBlock.width(itemWidth * items.size()).css('left', 0);
        items.css('left', 0);
        scrollLeft.addClass('disabled');
        
        function rtl(){
        var deltaWidth = itemsBlock.parent().width() - itemsBlock.width();
        
        if ( (parseInt(itemsBlock.css('left')) > deltaWidth + parseInt(items.css('margin-right')) ) && (!itemsBlock.is(':animated')) ){
          itemsBlock.animate({left: (parseInt(itemsBlock.css('left'))-itemWidth)+'px'}, options.speed, 'linear', function(){
            if (!(parseInt(itemsBlock.css('left')) > deltaWidth + parseInt(items.css('margin-right')) )) scrollRight.addClass('disabled');
            scrollLeft.removeClass('disabled');
          });
        }
      }
      function ltr(){
        var deltaWidth = itemsBlock.parent().width() - itemsBlock.width(); 
      
        if ( (parseInt(itemsBlock.css('left'))) < 0 && (!itemsBlock.is(':animated')) ){
          itemsBlock.animate({left: (parseInt(itemsBlock.css('left'))+itemWidth)+'px'}, options.speed, 'linear', function(){
            if( !(parseInt(itemsBlock.css('left')))) scrollLeft.addClass('disabled');
            scrollRight.removeClass('disabled');
          });
        }
      }
    scrollRight.click(rtl);
    scrollLeft.click(ltr);
    }
    else{
       //крутим справа на лево
      function rtl1(){
        if (!itemsBlock.find(options.itemSelector).filter(':animated').size()){
          var first = itemsBlock.find(options.itemSelector).first();
         // var w = first.outerWidth() + parseInt(itemsBlock.find(options.itemSelector).css('margin-right'));
          var w = first.outerWidth() + parseInt(first.css('margin-right'));
          first.animate({'margin-left' : -w}, options.speed, function(){itemsBlock.append(this); first.css('margin-left', 0); });
        }
      }
      
      //слева на право
      function ltr1(){
        if (!itemsBlock.find(options.itemSelector).filter(':animated').size()){
          var last = itemsBlock.find(options.itemSelector).last();
          //var w = last.outerWidth() + parseInt(itemsBlock.find(options.itemSelector).css('margin-right'));
          var w = last.outerWidth() + parseInt(last.css('margin-right'));
          last.css('margin-left', -w);
          itemsBlock.prepend(last);
          last.animate({'margin-left' : 0}, options.speed);
        }
      }

    scrollRight.click(rtl1);
    scrollLeft.click(ltr1);
    }
        
  });
};