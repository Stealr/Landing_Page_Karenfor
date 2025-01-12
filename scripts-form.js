document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.form');
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        tel: document.getElementById('tel'),
        theme: document.querySelector('.select-selected'),
        text: document.getElementById('text'),
        checkbox: document.querySelector('.checkbox'),
    };
    let isValid = true;

    // Регулярные выражения для проверки
    const regexes = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };

    fields.tel.addEventListener('focus', () => {
        if (fields.tel.value.length == 0) fields.tel.value = '+7 ';
    });

    fields.name.addEventListener('input', function () {
        validateRequired
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
            output += '-' + input.substring(7, 9);
        }
        if (input.length >= 10) {
            output += '-' + input.substring(9, 11);
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
        if (trimmed.length !== 16) {
            showError(fields.tel, 'Введите корректный номер телефона');
        } else {
            removeError(fields.tel);
        }
    }

    function validateRequired(input, errmsg) {
        const trimmed = input.value.replaceAll(' ', '');
        if (trimmed.length == 0) {
            isValid = false;
            input.classList.add('input-error');
        } else {
            removeError(input);
        }
    }

    function validateSelect() {
        if (fields.theme.classList.contains('placeholder')) {
            showError(fields.theme)
            document.querySelector('.select-items').classList.add('select-error');
        }
    }

    // ----------- Blur -----------
    fields.tel.addEventListener('blur', function () {
        validateTel();
    });

    fields.name.addEventListener('blur', function () {
        validateRequired(fields.name);
    });

    fields.text.addEventListener('blur', function () {
        validateRequired(fields.text);
    })

    fields.email.addEventListener('blur', () => validateField(fields.email, regexes.email, 'Введите корректную почту'));
    // -----------------------------

    // Обработчик отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        isValid = true;

        document.querySelectorAll('.error-message').forEach(msg => msg.remove());

        validateRequired(fields.name);
        validateField(fields.email, regexes.email, 'Введите корректную почту');
        validateTel();
        validateSelect();
        validateRequired(fields.text);
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
        removeError(fields.theme);
        selectItems.classList.remove('select-error');
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


    // ---------Privacy Policy---------

    const btnPolicy = document.getElementById('privacy-policy');
    const btnClose = document.getElementById('closeModal');
    const blackout = document.querySelector('.blackout');
    const privacyPolicy = document.querySelector('.privacy-policy');
    document.addEventListener('click', (e) => {
        if (!privacyPolicy.contains(e.target) && e.target != btnPolicy) {
            blackout.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.style.touchAction = 'auto';
        }
    });

    btnPolicy.addEventListener('click', function () {
        blackout.classList.add('active');

        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
    });

    btnClose.addEventListener('click', function () {
        blackout.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.style.touchAction = 'auto';
    });

    // let viewportmeta = document.querySelector('meta[name="viewport"]');
    // if (viewportmeta === null) {
    //     viewportmeta = document.createElement("meta");
    //     viewportmeta.setAttribute("name", "viewport");
    //     document.head.appendChild(viewportmeta);

    //     viewportmeta = document.querySelector('meta[name="viewport"]');
    // }
    // viewportmeta.setAttribute('content', "initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0");
    // console.log(document.querySelector('meta[name="viewport"]'));

    // function setZoom(scale) {
    //     let meta = document.querySelector('meta[name="viewport"]');
    //     if (!meta) {
    //         meta = document.createElement('meta');
    //         meta.name = 'viewport';
    //         document.head.appendChild(meta);
    //     }
    //     meta.setAttribute('content', `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`);
    // }
    // setZoom(1.0);

});
