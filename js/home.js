function Home() {
    const userAvatar = document.getElementById("user-avatar");
    const userDropdown = document.getElementById("user-dropdown");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        userAvatar.textContent = storedUser.name.charAt(0).toUpperCase();
        userAvatar.addEventListener("click", () => {
            userDropdown.classList.toggle("show");
        });
    } else {
        userAvatar.innerHTML ='<i data-lucide="user"></i>';
        lucide.createIcons();
        userAvatar.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-menu")) {
            userDropdown.classList.remove("show");
        }
    });
}
Home();