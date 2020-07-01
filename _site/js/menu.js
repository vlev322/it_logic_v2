$(document).ready(function() {

  if($('body').is('.home-page')) {

    $(document).on("scroll", onScroll);

    $('.nav_links a.lk[href^="#"]').click(function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $('a.lk').each(function () {
        $(this).removeClass('current-link');
      })
      $(this).addClass('current-link');

      var target = this.hash;
      $target = $(target);

      if ($target.get().length === 0) return false;

      var offsetTarget = $target.offset().top - 40;

      $('html, body').stop().animate({
        'scrollTop': offsetTarget
      }, 800, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });

      closeNav();
    });

    /*  Let's talk  */
    $('.lets-talk').click(function (e) {
      e.preventDefault();

      $('html, body').stop().animate({
        'scrollTop': $('#go-lets-talk').offset().top
      }, 800);

      $('#details').val('');

    });

    $('.to-about').click(function (e) {
        e.preventDefault();

        $('html, body').stop().animate({
            'scrollTop': $('#about').offset().top
        }, 800);
    });

  } else {
    $('.nav_links a.lk').each(function() {
      $(this).attr('href', '/' + this.hash);
    });

    /*  Let's talk  */
    var buttonLets = $('.header_btns .lets-talk').attr('href');
    $('.header_btns .lets-talk').attr('href', '/' + buttonLets);
  }

  /* mobile menu */

  $('.header_menu_m').click(function(e){

    if($(this).hasClass('close-btn')) {

      closeNav();

    } else {

      $('.nav').addClass('open');
      $(this).addClass('close-btn');
      $('.m_bg_menu').addClass('close-btn');
      $('body').addClass('no_scroll');
    }

  });

});

function closeNav(){
  $('.header_menu_m').removeClass('close-btn');
  $('.m_bg_menu').removeClass('close-btn');
  $('.nav').addClass('close');
  $('body').removeClass('no_scroll');

    setTimeout(function(){
    $('.nav').removeClass('close');
    $('.nav').removeClass('open');
  }, 300);
}

function onScroll(event){
  var scrollPosition = $(document).scrollTop();

  $('.nav a').each(function () {
    var currentLink = $(this);

    if (currentLink.attr("href").charAt(0) === "#") {
      var refElement = $(currentLink.attr("href"));

      var offsetElement = refElement.position().top - 60;

      if (offsetElement <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('.nav a').removeClass("current-link");
        currentLink.addClass("current-link");
      } else {
        currentLink.removeClass("current-link");
      }

      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        $('a').each(function () {
          $(this).removeClass('current-link');
        })
        //$('.nav a').last().addClass("current-link");
      }
    }
  });

}
