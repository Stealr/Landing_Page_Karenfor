document.addEventListener("DOMContentLoaded", () => {
  function animateCounter(counterElement) {
    const target = +counterElement.getAttribute('data-target');
    const duration = 2500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * target);

      counterElement.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Intersection Observer для отслеживания появления
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Прекращаем наблюдение
      }
    });
  }, { threshold: 1 }); // Активация, когда элемент наполовину виден

  counters.forEach(counter => observer.observe(counter));

  // observer.observe(document.querySelector('.facts'));

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
      1750: {
        slidesPerView: 5.3,
      },
    },
    freeMode: true,
    loop: true,
    watchSlidesProgress: true,
  });

  // Инициализация основного слайдера
  var mainSwiper = new Swiper('.main-slider', {
    spaceBetween: 0,
    autoplay: {
      delay: 7000,
      disableOnInteraction: true,
    },
    loop: true,
    
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


