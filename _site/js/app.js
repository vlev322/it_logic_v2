$(document).ready(function() {

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    $('.index_top').height($(window).height() - 57);
  }
  /*  Hire me  */
  $('.hire-me').click(function (e) {
    e.preventDefault();
    $('#details').val('I want to hire ' + $(this).attr('data-hired-name'));
    $('html, body').stop().animate({
        'scrollTop': $('#go-lets-talk').offset().top
    }, 800);
  });
  $('.service_item').serviceShowContent();
  $('#bottom-year').html(new Date().getFullYear());
  if($('body').is('.home-page')) {
    var shadower = $('.shadower');
    var topHeight = $('.index_top_wrapp').height() - 70;
    var headerHeight = $('header').height();
    $(window).scroll(function() {
      var wScroll = $(this).scrollTop();
      var headScroll = (-wScroll / 2);
      var faderScroll = (wScroll / 400);
      var fadeToColor = Math.min(faderScroll, .9);
      shadower.css({
        opacity: fadeToColor
      });
      var top = $(window).scrollTop();
      if(top >= headerHeight) {
        $('header').addClass('top');
      } else {
        $('header').removeClass('top');
      }
      if(top >= (headerHeight + headerHeight)) {
        $('header').addClass('fixed');
        whiteHeader();
      } else {
        $('header').removeClass('fixed');
        normalHeader();
      }
      if(top >= topHeight) {
        $('header').addClass('white');
      } else {
        $('header').removeClass('white');
      }
    });
  }

  $('.search_open .lupa').click(function(){
    lupaToClose();
    $('.search-form .search-field').focus();
  });
  $('.search_open .close').click(function(){
    closeToLupa();
  });
  /* questions */
  $('.questions li .ques_box').find('input[type="radio"]').on('change', function () {
    var $parent = $(this).closest('.ques_item').parent();
    if($(this).parent().hasClass('ques_other') && $(this).prop('checked') == true) {
      $parent.find('.ques_other_input').slideDown().focus();
    } else {
      $parent.find('.ques_other_input').slideUp();
    }
  });
  $('.questions li .ques_box').find('input[type="checkbox"]').on('change', function () {
    var $parent = $(this).closest('.ques_item').parent();
    if($(this).parent().hasClass('ques_other') && $(this).prop('checked') == true) {
      $parent.find('.ques_other_input').slideDown().focus();
    } else if ($(this).parent().hasClass('ques_other') && $(this).prop('checked') == false) {
      $parent.find('.ques_other_input').slideUp();
    }
  });
});
function whiteHeader() {
  $('header').find('.btn.fullwhite').removeClass('fullwhite').addClass('green');
  $('header').find('.btn.white').removeClass('white').addClass('fullblue');
  $('header').find('.search-submit').removeClass('icon_search_white').addClass('icon_search_dark');
  $('header').find('.icon_close_white').removeClass('icon_close_white').addClass('icon_close_dark');
  $('header').find('.icon_menu').removeClass('icon_menu').addClass('icon_menu_dark');
  $('header').find('.logo-white').removeClass('logo-white').addClass('logo');
}
function normalHeader() {
  //$('header').find('.btn.green').removeClass('green').addClass('fullwhite');
  $('header').find('.btn.fullblue').removeClass('fullblue').addClass('white');
  $('header').find('.search-submit').removeClass('icon_search_dark').addClass('icon_search_white');
  $('header').find('.icon_close_dark').removeClass('icon_close_dark').addClass('icon_close_white');
  $('header').find('.icon_menu_dark').removeClass('icon_menu_dark').addClass('icon_menu');
  $('header').find('.logo').removeClass('logo').addClass('logo-white');
}
function lupaToClose() {
  $('.search-form').stop().slideDown(function(){
    $('.search_open .lupa').fadeOut(200, function(){
      $('.search_open .close').fadeIn(200);
    });
  });
}
function closeToLupa() {
  $('.search-form').stop().slideUp(function(){
    $('.search_open .close').fadeOut(200, function(){
      $('.search_open .lupa').fadeIn(200);
    });
  });
}
(function ($) {
    $.fn.flashMessage = function (content, options) {
        if(!content) return;
        var node = $(this);
        var _options = $.extend({
            type: 'default',
            position: 'relative',
            timeToClose: 6000
        }, options);
        _init();
        function _init() {
            if (node.has('.flash-message-content')) {
                node.find('.flash-message-content').html(content);
            } else {
                node.html(content);
            }
            if (node.has('.flash-message-close')) _closeByButton();
            node.addClass(_options.position);
            node.addClass('visible rubberBand');
            _closeByTimeout(_options.timeToClose);
        }
        function _closeByButton() {
            node.find('.flash-message-close').click(_closeMessage);
        }
        function _closeByTimeout(timeout) {
          setTimeout(_closeMessage, timeout);
        }
        function _closeMessage () {
            node.removeClass('rubberBand').addClass('fadeOut');
            setTimeout(function () {
                node.removeClass(_options.position);
                node.removeClass('visible');
            }, 1000)
        }
    };
})(jQuery);