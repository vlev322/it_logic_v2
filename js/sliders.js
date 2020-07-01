(function (window, Swiper) {
  window.onload = function () {
    const swiperSecondScreen = new Swiper(".slider_about", {
      loop: true,
      autoplay: {
        delay: 6000,
      },
      navigation: {
        nextEl: ".slider_about .swiper-button-next",
        prevEl: ".slider_about .swiper-button-prev",
      },
      pagination: {
        el: ".slider_about .swiper-pagination",
        clickable: true,
      },
    });

    const testimonialsSlider = new Swiper(".testimonials-slider", {
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 6000,
      },
      navigation: {
        nextEl: ".testimonials-slider .swiper-button-next",
        prevEl: ".testimonials-slider .swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        init: function (swiper) {
          function onScroll(event) {
            var scrollPosition = $(document).scrollTop();
            var testimonialsTop = $("#clients").position().top;

            if (
              testimonialsTop <= scrollPosition &&
              testimonialsTop + $("#clients").height() > scrollPosition
            ) {
              testimonialsSlider.autoplay.start();
            } else {
              testimonialsSlider.autoplay.stop();
            }
          }
          $(document).on("scroll", onScroll);
        },
      },
    });

    var teamSlider = new Swiper(".team-slider", {
      simulateTouch: window.innerWidth < 767,
      effect: window.innerWidth > 767 ? "fade" : "slide",
      on: {
        init: function (swiper) {
          $(".team-slider-pagination .pagination-item").each(function () {
            $(this).on("click", function () {
              var $this = $(this);

              $(".pagination-item").removeClass("active");
              teamSlider.slideTo($this.index());
              $this.addClass("active");
            });
          });
          console.log("init");
        },

        slideChangeTransitionStar: function () {
          $(".team-slider .swiper-slide").each(function () {
            if ($(this).hasClass("swiper-slide-active")) {
              var sliderIndex = $(this).index();
              $(".pagination-item").removeClass("active");
              $(".team-slider-pagination").find(".pagination-item").eq(sliderIndex).addClass("active");
            }
          });
          console.log("slideChangeTransitionStart");
        },
      },
      autoplay: {
        delay: 6000,
      },
      navigation: {
        nextEl: ".team-slider .swiper-button-next",
        prevEl: "team-slider .swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 1500,
      parallax: true,
    });
  };
})(window, Swiper);
