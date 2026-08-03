function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === '' && password === '') {
        alert("Please fill in all fields!");
        return;
    }
    localStorage.getItem('user');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
        alert("No registered user found. Please register first.");
        return;
    }
    if (email !== storedUser.email || password !== storedUser.password) {
        alert("Invalid email or password.");
        return;
    }
    alert("Login successful!");
    window.location.href = 'index.html';
}