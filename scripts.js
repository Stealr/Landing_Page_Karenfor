document.addEventListener("DOMContentLoaded", () => {
  // Инициализация слайдера миниатюр
  var thumbnailSwiper = new Swiper('.thumbnail-slider', {
    breakpoints: {
      400: {
        slidesPerView: 1.2,
      },
      500: {
        slidesPerView: 1.5,
      },
      650: {
        slidesPerView: 2,
      },
      750: {
        slidesPerView: 2.3,
      },
      1070: {
        slidesPerView: 3.3,
      },
      1385: {
        slidesPerView: 4.3,
      },
      1700: {
        slidesPerView: 5.3,
      },
    },
    freeMode: true,
    watchSlidesProgress: true,
  });

  // Инициализация основного слайдера
  var mainSwiper = new Swiper('.main-slider', {
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button.next',
      prevEl: '.swiper-button.prev',
    },
    pagination: {
      el: '.swiper-pagination', // Селектор для контейнера точек
      clickable: true, // Делает точки кликабельными
    },
    thumbs: {
      swiper: thumbnailSwiper, // Привязка миниатюр
    },
  });
});
