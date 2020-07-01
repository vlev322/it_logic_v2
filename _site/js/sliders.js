(function (window, Swiper) {
    window.onload = function () {
        console.log('From _Slider');

        var swiper = new Swiper('.index_slider', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            parallax: true,
            effect: 'fade',
            speed: 2000,
            loop: true
        });

        var swiperTeam = new Swiper('.index_team_slider', {
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            speed: 1500,
            parallax: true
        });

        var swiperBlog = new Swiper('.index_blog_slider', {
            paginationClickable: true
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev'
        });

        var swiperSecondScreen = new Swiper('.slider_about', {
            pagination: '.slider_about .swiper-pagination',
            paginationClickable: true,
            nextButton: '.slider_about .swiper-button-next',
            prevButton: '.slider_about .swiper-button-prev',
            loop: true
        });

        var testimonialsSlider = new Swiper('.testimonials-slider', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.testimonials-slider .swiper-button-next',
            prevButton: '.testimonials-slider .swiper-button-prev',
            effect: 'fade',
            loop: true,
            autoplay: 6000,
            onInit: function() {
                function onScroll(event){
                    var scrollPosition = $(document).scrollTop();
                    var testimonialsTop = $('#clients').position().top;

                    if (testimonialsTop <= scrollPosition && testimonialsTop
                        + $('#clients').height() > scrollPosition) {
                        testimonialsSlider.startAutoplay();
                    } else {
                        testimonialsSlider.stopAutoplay();
                    }
                }
                $(document).on("scroll", onScroll);
            }
        });

        var teamSlider = new Swiper('.team-slider', {
            simulateTouch: window.innerWidth < 767,
            effect: window.innerWidth > 767 ? 'fade' : 'slide',
            onInit: function () {
                $('.team-slider-pagination .pagination-item').each(function () {
                    $(this).on('click', function () {
                        var $this = $(this);

                        $('.pagination-item').removeClass('active');
                        teamSlider.slideTo($this.index());
                        $this.addClass('active');
                    });
                });
            },
            onSlideChangeStart: function () {
                $('.team-slider .swiper-slide').each(function () {
                    if($(this).hasClass('swiper-slide-active')) {
                        var sliderIndex = $(this).index();
                        $('.pagination-item').removeClass('active');
                        $('.team-slider-pagination').find('.pagination-item')
                            .eq(sliderIndex).addClass('active');
                    }
                });
            },
            nextButton: '.team-slider .swiper-button-next',
            prevButton: '.team-slider .swiper-button-prev'
        });
    }
})(window, Swiper);
