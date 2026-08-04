function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsCheckbox = document.getElementById('termsCheckbox').querySelector('input[type="checkbox"]');
    const validateEmail = (email) => {
        const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return res.test(email);
    }
    
    const showMsg = (msg, type) => {
        if(window.showToast) window.showToast(msg, type);
        else alert(msg);
    };

    if (!validateEmail(email)) {
        showMsg("Please enter a valid email address!", "error");
        return;
    }
    if (!name || !email || !password) {
        showMsg("Please fill in all fields!", "error");
        return;
    }
    if (password !== confirmPassword) {
        showMsg("Passwords do not match!", "error");
        return;
    }
    if (!termsCheckbox.checked) {
        showMsg("You must agree to the Terms & Privacy Policy!", "warning");
        return;
    }
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    sessionStorage.setItem("currentUser", JSON.stringify({ name, email }));
    
    showMsg("Registration successful! Please log in.", "success");
    if(window.showToast) {
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    } else {
        window.location.href = 'login.html';
    }
}