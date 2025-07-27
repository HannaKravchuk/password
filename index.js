document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const toggleVisibility = document.getElementById('toggleVisibility');
    const characterContainer = document.getElementById('character');
    const strengthText = document.getElementById('strengthText');
    const passwordChecker = document.querySelector('.password-checker');

    const lengthReq = document.getElementById('lengthReq');
    const numberReq = document.getElementById('numberReq');
    const upperReq = document.getElementById('upperReq');
    const specialReq = document.getElementById('specialReq');

    let isVisible = false;
    toggleVisibility.addEventListener('click', function() {
        isVisible = !isVisible;
        passwordInput.type = isVisible ? 'text' : 'password';
        toggleVisibility.textContent = isVisible ? '🙈' : '👁️';
    });
    
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);

        passwordChecker.classList.remove('weak', 'medium', 'strong');
        
        if (password.length === 0) {
            strengthText.textContent = 'Enter password';
            return;
        }
        
        if (strength === 'weak') {
            passwordChecker.classList.add('weak');
            strengthText.textContent = 'Weak password';
        } else if (strength === 'medium') {
            passwordChecker.classList.add('medium');
            strengthText.textContent = 'Medium password';
        } else {
            passwordChecker.classList.add('strong');
            strengthText.textContent = 'Strong password';
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
        if (password.length >= 8) {
            lengthReq.classList.add('valid');
        } else {
            lengthReq.classList.remove('valid');
        }
        
        if (/\d/.test(password)) {
            numberReq.classList.add('valid');
        } else {
            numberReq.classList.remove('valid');
        }

        if (/[A-ZА-Я]/.test(password)) {
            upperReq.classList.add('valid');
        } else {
            upperReq.classList.remove('valid');
        }
        
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            specialReq.classList.add('valid');
        } else {
            specialReq.classList.remove('valid');
        }
    }
});