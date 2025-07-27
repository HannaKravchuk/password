document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('passwordInput');
    const toggleVisibility = document.getElementById('toggleVisibility');
    const characterContainer = document.getElementById('character');
    const strengthText = document.getElementById('strengthText');
    const strengthFill = document.getElementById('strengthFill');
    const themeSwitcher = document.getElementById('themeSwitcher');

    const lengthReq = document.getElementById('lengthReq');
    const numberReq = document.getElementById('numberReq');
    const upperReq = document.getElementById('upperReq');
    const specialReq = document.getElementById('specialReq');

    const passwordChecker = document.querySelector('.password-checker');

    // Тема
    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        if (themeSwitcher) themeSwitcher.checked = true;
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', function () {
            document.body.classList.toggle('dark');
            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // Показать/скрыть пароль
    let isVisible = false;
    toggleVisibility.addEventListener('click', function () {
        isVisible = !isVisible;
        passwordInput.type = isVisible ? 'text' : 'password';
        toggleVisibility.textContent = isVisible ? '🙈' : '👁️';
    });

    // Проверка пароля
    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);

        // Анимация персонажа
        characterContainer.style.opacity = 0;
        characterContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            characterContainer.style.opacity = 1;
            characterContainer.style.transform = 'translateY(0)';
        }, 50);

        passwordChecker.classList.remove('weak', 'medium', 'strong');

        if (password.length === 0) {
            strengthText.textContent = 'Enter password';
            strengthFill.style.width = '0';
            return;
        }

        if (strength === 'weak') {
            passwordChecker.classList.add('weak');
            strengthText.textContent = 'Weak password';
            strengthFill.style.width = '33%';
            strengthFill.style.backgroundColor = '#e74c3c';
        } else if (strength === 'medium') {
            passwordChecker.classList.add('medium');
            strengthText.textContent = 'Medium password';
            strengthFill.style.width = '66%';
            strengthFill.style.backgroundColor = '#f39c12';
        } else {
            passwordChecker.classList.add('strong');
            strengthText.textContent = 'Strong password';
            strengthFill.style.width = '100%';
            strengthFill.style.backgroundColor = '#2ecc71';
        }

        updateRequirements(password);
    });

    function checkPasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/\d/.test(password)) strength++;
        if (/[A-ZА-Я]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    }

    function updateRequirements(password) {
        lengthReq.classList.toggle('valid', password.length >= 8);
        numberReq.classList.toggle('valid', /\d/.test(password));
        upperReq.classList.toggle('valid', /[A-ZА-Я]/.test(password));
        specialReq.classList.toggle('valid', /[!@#$%^&*(),.?":{}|<>]/.test(password));
    }
});
