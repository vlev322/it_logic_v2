(function ($, window) {

    $.fn.serviceShowContent = function (selector, options) {
        options = $.extend(true, {
            additionalContentSelector: '.service-additional-content'
        }, options);

        return this.each(function(i, e) {
            var $this = $(this);

            function _closeAdditionalAll() {
                $('.' + $this.get()[0].className).removeClass('active');
                $('.icon_close', '.' + $this.get()[0].className).off('click').remove();
            }

            $this.click(function (e) {
                e.stopPropagation();
                e.preventDefault();

                _closeAdditionalAll();

                $(options.additionalContentSelector, $this).append('<i class="icon_close">X</i>');

                if($this.hasClass('active')) {
                    $this.removeClass('active');
                    $(options.additionalContentSelector).fadeOut().removeAttr('style');
                    return false
                }

                $this.addClass('active');

                $(options.additionalContentSelector).fadeOut().removeAttr('style');
                $(options.additionalContentSelector, $this).fadeIn(300).css({
                    left: window.innerWidth > 767 ? $this.position().left : '0',
                    display: 'flex'
                });
            });

            $this.on('click', function () {

                if($(window).width() > 767) {
                    if(i === 0 || i === 1 || i === 2) {
                        $(options.additionalContentSelector + ' a:first-child', $this).delay(300).css({
                            marginTop: $this.height()
                        });
                    } else {
                        $(options.additionalContentSelector + ' a:last-of-type', $this).delay(300).css({
                            marginBottom: $this.height()
                        });
                    }
                }
            });
        });
    }

    if($(window).width() < 767) {
        $(".service-block").on('click', function () {
            if ($('.active').get(0) !== $(this).get(0)) {
                $('.active').removeClass('active');
            }
            $(this).toggleClass("active");
        });
    };

})(jQuery, window);
