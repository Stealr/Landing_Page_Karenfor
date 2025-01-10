document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        tel: document.getElementById('tel'),
        theme: document.querySelector('.select-selected'),
        text: document.getElementById('text'),
        checkbox: document.querySelector('.custom-checkbox'),
    };

    let isValid = true;

    // Регулярные выражения для проверки
    const regexes = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };

    fields.tel.addEventListener('focus', () => {
        if (fields.tel.value.length == 0) fields.tel.value = '+7 ';
    });

    // Форматирование номера телефона
    fields.tel.addEventListener('input', function () {
        const input = tel.value.replace(/\D/g, ''); // Удаляем все нечисловые символы
        const formatted = formatPhoneNumber(input);
        fields.tel.value = formatted;
    });

    // Функция для форматирования номера телефона
    function formatPhoneNumber(input) {
        let output = '+7 ';
        if (input.length > 1) {
            output += '(' + input.substring(1, 4);
        }
        if (input.length >= 5) {
            output += ') ' + input.substring(4, 7);
        }
        if (input.length >= 8) {
            output += ' ' + input.substring(7, 9);
        }
        if (input.length >= 10) {
            output += ' ' + input.substring(9, 11);
        }
        return output;
    }

    // Отображение ошибки
    function showError(input, message) {
        removeError(input);

        input.classList.add('input-error');
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = '#ff6262';
        error.style.fontSize = '0.6rem';
        error.textContent = message;
        input.parentNode.appendChild(error);
        isValid = false;
    }

    // Удаление предыдущей ошибки
    function removeError(input) {
        input.classList.remove('input-error');
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
    }

    // Валидация поля почты
    function validateField(input, regex, errorMessage) {
        removeError(input);
        if (!regex.test(input.value.trim())) {
            showError(input, errorMessage);
        }
    }

    function validateTel() {
        const trimmed = fields.tel.value.replaceAll(' ', '');
        if (trimmed.length !== 14) {
            showError(fields.tel, 'Введите корректный номер телефона');
        } else {
            removeError(fields.tel);
        }
    }

    function validateRequired(input, errmsg) {
        const trimmed = input.value.replaceAll(' ', '');
        if (trimmed.length == 0) {
            showError(input, errmsg);
        } else {
            removeError(input);
        }
    }

    function validateSelect() {
        if (fields.theme.classList.contains('placeholder')) {
            showError(fields.theme, 'Выберите тему обращения')
            document.querySelector('.select-items').classList.add('select-error');
        }
    }

    // ----------- Blur -----------
    fields.tel.addEventListener('blur', function () {
        validateTel();
    });

    fields.name.addEventListener('blur', function () {
        validateRequired(fields.name, 'Введите ФИО');
    });

    fields.text.addEventListener('blur', function () {
        validateRequired(fields.text, 'Введите текст обращения');
    })

    fields.email.addEventListener('blur', () => validateField(fields.email, regexes.email, 'Введите корректную почту'));
    // -----------------------------

    // Обработчик отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        isValid = true;

        document.querySelectorAll('.error-message').forEach(msg => msg.remove());

        validateRequired(fields.name, 'Введите ФИО');
        validateField(fields.email, regexes.email, 'Введите корректную почту');
        validateTel();
        validateSelect();
        validateRequired(fields.text, 'Введите текст обращения');
        if (!fields.checkbox.querySelector('input').checked) {
            showError(fields.checkbox, 'Необходимо согласие на обработку данных');
        }


        if (isValid) {
            const flipBox = document.querySelector('.flip-box');
            if (!flipBox.classList.contains('flipped')) {
                flipBox.classList.add('flipped');
                setTimeout(() => flipBox.classList.remove('flipped'), 2000);
            }

            clearForm();
        }
    });

    function clearForm() {
        form.reset();
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());

        selectSelected.classList.add('placeholder');

        const selectedPlaceholder = document.querySelector('.select-selected.placeholder');

        selectedPlaceholder.innerHTML = '<span>Тема обращения</span>';

    }

    fields.checkbox.querySelector('input').addEventListener('change', function () {
        if (fields.checkbox.querySelector('input').checked) {
            removeError(fields.checkbox);
        }
    });


    const customSelect = document.querySelector('.custom-select');
    const selectSelected = customSelect.querySelector('.select-selected');
    const selectItems = customSelect.querySelector('.select-items');
    const selectElement = customSelect.querySelector('select');

    selectSelected.addEventListener('click', () => {
        selectItems.classList.toggle('active');
        selectSelected.classList.toggle('active');
    });

    selectItems.addEventListener('click', (e) => {
        const selectedValue = e.target.textContent;

        selectSelected.textContent = selectedValue;

        selectElement.value = selectedValue;

        selectItems.classList.remove('active');
        selectSelected.classList.remove('active');

        selectSelected.classList.remove('placeholder');
        removeError(fields.theme);
        selectItems.classList.remove('select-error');
    });

    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            selectItems.classList.remove('active');
            selectSelected.classList.remove('active');
        }
    });
});
