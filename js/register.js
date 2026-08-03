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
    if (!validateEmail(email)) {
        alert("Please enter a valid email address!");
        return;
    }
    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    if (!termsCheckbox.checked) {
        alert("You must agree to the Terms & Privacy Policy!");
        return;
    }
    addEventListener('click', function() {
        alert("Registration successful! Please log in.");
    });
    console.log("Registration data:", { name, email, password });
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    window.location.href = 'login.html';
}