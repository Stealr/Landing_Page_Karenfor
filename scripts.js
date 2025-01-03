document.addEventListener("DOMContentLoaded", () => {
    // Инициализация слайдера миниатюр
    const thumbnailSwiper = new Swiper('.thumbnail-slider', {
      spaceBetween: 10,
      slidesPerView: 5.3,
      freeMode: true,
      watchSlidesProgress: true,
    });
  
    // Инициализация основного слайдера
    const mainSwiper = new Swiper('.main-slider', {
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-button.next',
        prevEl: '.swiper-button.prev',
      },
      thumbs: {
        swiper: thumbnailSwiper, // Привязка миниатюр
      },
    });
  });
  