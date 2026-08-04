function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === '' || password === '') {
        if(window.showToast) window.showToast("Please fill in all fields!", "error");
        else alert("Please fill in all fields!");
        return;
    }
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
        if(window.showToast) window.showToast("No registered user found. Please register first.", "warning");
        else alert("No registered user found. Please register first.");
        return;
    }
    if (email !== storedUser.email || password !== storedUser.password) {
        if(window.showToast) window.showToast("Invalid email or password.", "error");
        else alert("Invalid email or password.");
        return;
    }
    
    if(window.showToast) {
        window.showToast(`Welcome, ${storedUser.name}! Login successful!`, "success");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        alert(`Welcome, ${storedUser.name}! Login successful!`);
        window.location.href = 'index.html';
    }
}