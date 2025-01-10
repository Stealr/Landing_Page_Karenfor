document.addEventListener("DOMContentLoaded", () => {

  // const wave1 = document.getElementById('path3106');
  // const wave2 = document.getElementById('path3106-8');
  
  // const paths = {
  //   wave1: [
  //     "M 47.177157,158.7195 C 20.355754,8.35551 57.233783,13.18407 82.707723,22.5814 51.08438,18.84506 78.73067,57.93986 124.72974,62.54641 55.31676,5.53967 97.85902,-6.09823 148.52821,-0.91755 42.68051,4.36387 72.79379,11.87371 124.61328,14.16323 35.32693,1.56083 43.16126,24.53453 43.16126,24.53453 H 0.0374 L 0,106.43237 C 0,0 9.1575707,36.01195 47.177157,52.28713 Z",
  //     "M 55.072026,144.21671 C 20.97583,20.49787 47.372724,47.14408 72.846664,56.54141 51.08438,18.84506 64.61671,15.97913 110.68894,19.50595 55.08504,4.21675 102.65051,32.66717 155.43035,35.60919 44.25734,2.46696 80.44047,-17.51156 132.25996,-15.22204 35.32693,1.56083 44.61943,40.9763 44.61943,40.9763 H 0.0374 L 0,121.38133 C 0,0 40.398525,8.49623 55.072026,22.83538 Z",
  //     "M 47.177157,158.7195 C 20.355754,8.35551 57.233783,13.18407 82.707723,22.5814 51.08438,18.84506 78.73067,57.93986 124.72974,62.54641 55.31676,5.53967 97.85902,-6.09823 148.52821,-0.91755 42.68051,4.36387 72.79379,11.87371 124.61328,14.16323 35.32693,1.56083 43.16126,24.53453 43.16126,24.53453 H 0.0374 L 0,106.43237 C 0,0 9.1575707,36.01195 47.177157,52.28713 Z"
  //   ],
  //   wave2: [
  //     "M 59.019581,187.90533 C 21.678017,3.77289 41.748169,8.60705 70.661689,19.98875 50.66535,19.94424 65.90557,47.11335 111.9778,50.64017 55.08504,4.21675 80.10682,3.3292 118.5391,5.94509 41.9124,2.85276 163.25859,17.07171 163.25859,17.07171 H 1.1306177e-4 L 0,144.33276 C 0,0 17.263637,36.30528 59.019581,43.57257 Z",
  //     "M 61.229133,190.76256 C 9.73323,11.11374 28.188446,26.97384 57.101967,38.35554 50.66535,19.94424 77.71918,14.24766 123.79141,17.77448 55.08504,4.21675 77.70018,16.38843 116.91707,21.55551 54.57691,7.19086 165.06088,-17.24281 164.41718,13.10296 H 1.1306177e-4 L 0,155.44526 C 0,0 33.513896,3.67108 61.229133,35.3173 Z",
  //     "M 59.019581,187.90533 C 21.678017,3.77289 41.748169,8.60705 70.661689,19.98875 50.66535,19.94424 65.90557,47.11335 111.9778,50.64017 55.08504,4.21675 80.10682,3.3292 118.5391,5.94509 41.9124,2.85276 163.25859,17.07171 163.25859,17.07171 H 1.1306177e-4 L 0,144.33276 C 0,0 17.263637,36.30528 59.019581,43.57257 Z"
  //   ]
  // };
  
  // let progress = 0;
  // const duration = 9000; // Animation duration in milliseconds
  // const fps = 60; // Target frames per second
  // const step = 1 / fps;
  
  // // Разбираем путь SVG на команды и числовые параметры
  // function parsePath(path) {
  //   const regex = /([a-zA-Z])|(-?\d*\.?\d+)/g;
  //   const result = [];
  //   let match;
  
  //   while ((match = regex.exec(path)) !== null) {
  //     if (isNaN(match[0])) {
  //       result.push(match[0]); // Команда (например, M, C)
  //     } else {
  //       result.push(parseFloat(match[0])); // Числовое значение
  //     }
  //   }
  //   return result;
  // }
  
  // // Интерполяция двух путей
  // function interpolatePath(p1, p2, t) {
  //   const path1 = parsePath(p1);
  //   const path2 = parsePath(p2);
  
  //   return path1.map((value, index) => {
  //     if (typeof value === "string") {
  //       return value; // Команда остается неизменной
  //     }
  //     return value + t * (path2[index] - value); // Интерполируем только числа
  //   }).join(" ");
  // }
  
  // // Анимация
  // function animateWave() {
  //   progress += step;
  
  //   const t = (progress % 1); // Нормализуем прогресс в диапазон [0, 1]
  //   const index = Math.floor(t * (paths.wave1.length - 1));
  //   const nextIndex = (index + 1) % paths.wave1.length;
  //   const localT = (t * (paths.wave1.length - 1)) % 1;
    


  //   // Интерполируем и обновляем пути
  //   wave1.setAttribute("d", interpolatePath(paths.wave1[index], paths.wave1[nextIndex], localT));
  //   wave2.setAttribute("d", interpolatePath(paths.wave2[index], paths.wave2[nextIndex], localT));
  
  //   requestAnimationFrame(animateWave);
  // }
  
  // requestAnimationFrame(animateWave);
  



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


