(function($){ 
    $.fn.intro = function(options) {

        var defaults = {
            line   : '#ffffff',
            speedwidth   : 2,
            speedheight  : 1,
            speedopacity : 1,
            bg : '#333',
            lineheight : 2,
            wrapperDiv : '.intro-wrapper',
            lineDiv : '.intro-line'
        };

        var settings = $.extend(defaults, options || {});

        $('body').css({
          'overflow-y': 'hidden',
          'visibility': 'hidden'
        });

        $(settings.lineDiv).css({
          'background': settings.line,
          'height': settings.lineheight+'px',
          'margin-top': (settings.lineheight/2)+'px',
          'width': '0%',
          'visibility':'visible'
        }); 
      
        $(settings.lineDiv),parent = new TimelineMax({
          repeat:0, 
          yoyo:false, 
          repeatDelay:0
        });
      
        parent.to(settings.lineDiv, settings.speedwidth, { css: {width: '+=100%'}, delay: 0, ease:Power4.easeIn}, 0).timeScale(1);
        parent.to(settings.lineDiv, settings.speedheight, { css: {height: '+=100%', top: '-=50%'}, delay: settings.speedwidth, ease:Power4.easeOut, onComplete:step}, 0).timeScale(1);

        function step() {
          $('body').attr('style','');
          $('body').css({ 
            'visibility': 'visible' 
          });

          $(settings.lineDiv),parent = new TimelineMax({repeat:0, yoyo:false, repeatDelay:0});
          parent.to(settings.wrapperDiv, settings.speedopacity, { css: {opacity: '0'}, delay: 0, ease:Power4.easeOut, onComplete:step2}, 0).timeScale(1);
        }
      
        function step2() {
          $(settings.wrapperDiv).remove();
          $('body').css({
            'overflow-y': 'visible'
          }); 
        }
    };

})(jQuery);

$().intro({ 
  line: 'black',
  speedwidth   : 2,  
});  