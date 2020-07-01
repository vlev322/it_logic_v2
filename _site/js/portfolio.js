var timePortfolio = 400;

$(document).ready(function() {

  $('.portfolio_wrap').click(function(){
    var $popup = $(this).next().fadeIn(timePortfolio);
    $('.portfolio').css('z-index', 11);
    $('body').addClass('no_scroll');

    $popup.find('.portp_pop_bg').click(function(){
      $($popup).fadeOut(timePortfolio);

      setTimeout(function(){
        $('.portfolio').css('z-index', 0);
        $('body').removeClass('no_scroll');
      }, timePortfolio);
    });

    $popup.find('.portp_close').click(function(){
      $($popup).fadeOut(timePortfolio);

      setTimeout(function(){
        $('.portfolio').css('z-index', 0);
        $('body').removeClass('no_scroll');
      }, timePortfolio);
    });
  });
});
