document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.nav__btn').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Отменяем стандартное поведение ссылки
      const targetId = this.getAttribute('href'); // Получаем значение href (например, "#section")
      const targetElement = document.querySelector(targetId); // Находим целевой элемент
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' }); // Плавная прокрутка к элементу
      }
    });
  });

  const svgElement = document.querySelector('svg');

  const paths = svgElement.querySelectorAll('path');

  function isSafari() {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      userAgent.includes("safari") &&
      !userAgent.includes("chrome") &&
      !userAgent.includes("edge")
    );
  }

  if (isSafari()) {
    paths.forEach(path => {
      const style = path.getAttribute('style');
      if (style) {
        const updatedStyle = style.replace(/filter:url\(#\w+\);?/g, '');
        path.setAttribute('style', updatedStyle);
      }
    });
  }


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

  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 1 });

  counters.forEach(counter => observer.observe(counter));

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
      el: '.swiper-pagination',
      clickable: true,
    },
    thumbs: {
      swiper: thumbnailSwiper,
    },
  });
});


