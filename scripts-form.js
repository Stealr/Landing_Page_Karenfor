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

    const regexes = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };

    fields.tel.addEventListener('focus', () => {
        if (fields.tel.value.length == 0) fields.tel.value = '+7 ';
    });

    fields.name.addEventListener('input', function () {
        validateRequired
    });

    fields.tel.addEventListener('input', function () {
        const input = tel.value.replace(/\D/g, ''); 
        const formatted = formatPhoneNumber(input);
        fields.tel.value = formatted;
    });

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

    function removeError(input) {
        input.classList.remove('input-error');
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
    }

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

    //temp solution
    form.addEventListener('submit', async function submitForm(event) {
        event.preventDefault();
    
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    
        let isValid = true;
    
        validateRequired(fields.name);
        validateField(fields.email, regexes.email, 'Введите корректную почту');
        validateTel();
        validateSelect();
        validateRequired(fields.text);
        if (!fields.checkbox.querySelector('input').checked) {
            showError(fields.checkbox, 'Необходимо согласие на обработку данных');
            isValid = false;
        }
    
        if (isValid) {
            const formData = {
                name: fields.name.value,
                email: fields.email.value,
                phone: fields.tel.value,
                subject: fields.theme.textContent,
                text: fields.text.value
            };
    
            try {
                fetch("https://www.form-to-email.com/api/s/MbDFD56pbiSq", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }).catch(error => console.error('Error:', error));

                const flipBox = document.querySelector('.flip-box');
                    if (!flipBox.classList.contains('flipped')) {
                        flipBox.classList.add('flipped');
                        setTimeout(() => flipBox.classList.remove('flipped'), 2000);
                    }
    
                clearForm();
            } catch (error) {
                console.error('Error:', error);
            }
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
});
