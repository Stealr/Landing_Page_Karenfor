document.addEventListener("DOMContentLoaded", () => {
  // Получаем все элементы формы
  const form = document.querySelector('.form');

  // Функция для очистки формы
  function clearForm() {
    // Очищаем текстовые поля
    const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    textInputs.forEach(input => {
      input.value = ''; // Очищаем значения полей
    });

    // Снимаем выбор с чекбоксов
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false; // Снимаем галочку
    });

    // Сбрасываем выпадающий список (если есть)
    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
      select.selectedIndex = 0; // Сбрасываем выбор (выбираем первый элемент)
    });
  }

  // Пример вызова функции при нажатии кнопки "Отправить"
  document.querySelector('.btn-submit').addEventListener('click', function (e) {
    e.preventDefault();
    clearForm();
  });


  document.querySelector('.flip-box').addEventListener('click', function () {
    if (this.classList != 'flip-box flipped') {
      this.classList.toggle('flipped');
      setTimeout(() => (this.classList.remove('flipped')), 2000);
    }
  });

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


  const customSelect = document.querySelector('.custom-select');
  const selectSelected = customSelect.querySelector('.select-selected');
  const selectItems = customSelect.querySelector('.select-items');
  const selectElement = customSelect.querySelector('select');

  // Открытие/закрытие списка
  selectSelected.addEventListener('click', () => {
    selectItems.classList.toggle('active');
    selectSelected.classList.toggle('active');
  });

  // Обработка кликов на элементы списка
  selectItems.addEventListener('click', (e) => {
    const selectedValue = e.target.textContent;

    selectSelected.textContent = selectedValue;

    selectElement.value = selectedValue;

    selectItems.classList.remove('active');
    selectSelected.classList.remove('active');
  });

  // Закрытие выпадающего списка при клике вне области
  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
      selectItems.classList.remove('active');
      selectSelected.classList.remove('active'); // Убираем класс стрелки
    }
  });
});


