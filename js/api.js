const API_KEY = "90dd53e6447dd8d720008f91f0b5088e";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGRkNTNlNjQ0N2RkOGQ3MjAwMDhmOTFmMGI1MDg4ZSIsIm5iZiI6MTc4NTI5Mjk2Ni4xOTM5OTk4LCJzdWIiOiI2YTY5NjhhNjk2YTZhYzhlNmM2NWUwZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YsF2kZD2-fo6YNxgnHPpxE45d3Z1-Cew40TZPlZ3maE";

window.showToast = function(message, type = 'info') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '99999';
        toastContainer.style.display = 'flex';
        toastContainer.style.flexDirection = 'column';
        toastContainer.style.gap = '10px';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.minWidth = '250px';
    toast.style.padding = '16px 24px';
    toast.style.background = type === 'error' ? '#ff4b4b' : (type === 'success' ? '#10b981' : '#E2B83C');
    toast.style.color = '#fff';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    toast.style.fontFamily = 'Inter, sans-serif';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '14px';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    toast.innerText = message;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

window.showConfirm = function(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '100000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backdropFilter = 'blur(5px)';
    
    const box = document.createElement('div');
    box.style.background = '#1A1A24';
    box.style.padding = '24px 32px';
    box.style.borderRadius = '12px';
    box.style.border = '1px solid rgba(255,255,255,0.1)';
    box.style.textAlign = 'center';
    box.style.minWidth = '300px';
    box.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5)';
    
    const text = document.createElement('p');
    text.innerText = message;
    text.style.color = '#fff';
    text.style.fontSize = '16px';
    text.style.fontWeight = '600';
    text.style.marginBottom = '24px';
    
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'center';
    btnContainer.style.gap = '16px';
    
    const btnYes = document.createElement('button');
    btnYes.innerText = 'Yes';
    btnYes.style.padding = '10px 24px';
    btnYes.style.border = 'none';
    btnYes.style.borderRadius = '6px';
    btnYes.style.background = '#ff4b4b';
    btnYes.style.color = 'white';
    btnYes.style.fontWeight = '600';
    btnYes.style.cursor = 'pointer';
    
    const btnNo = document.createElement('button');
    btnNo.innerText = 'No';
    btnNo.style.padding = '10px 24px';
    btnNo.style.border = '1px solid rgba(255,255,255,0.2)';
    btnNo.style.borderRadius = '6px';
    btnNo.style.background = 'transparent';
    btnNo.style.color = 'white';
    btnNo.style.fontWeight = '600';
    btnNo.style.cursor = 'pointer';
    
    btnYes.onclick = () => {
        document.body.removeChild(overlay);
        onConfirm();
    };
    
    btnNo.onclick = () => {
        document.body.removeChild(overlay);
    };
    
    btnContainer.appendChild(btnNo);
    btnContainer.appendChild(btnYes);
    
    box.appendChild(text);
    box.appendChild(btnContainer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

window.toggleMobileMenu = function(e) {
    if(e) e.stopPropagation();
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function initMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks && !document.querySelector('.mobile-close-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = '#fff';
        closeBtn.style.fontSize = '32px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.display = 'none'; 
        closeBtn.classList.add('mobile-close-btn');
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            navLinks.classList.remove('active');
        };
        navLinks.appendChild(closeBtn);
    }

    const navLinksList = document.querySelector('.nav-links ul');
    if (navLinksList && !document.getElementById('mobile-auth-link')) {
        const li = document.createElement('li');
        li.className = 'mobile-only';
        const a = document.createElement('a');
        a.id = 'mobile-auth-link';
        a.className = 'nav-link';
        
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            a.href = '#';
            a.innerText = 'Logout';
            a.onclick = (e) => {
                e.preventDefault();
                if (window.showConfirm) {
                    window.showConfirm("Do you want to logout?", () => {
                        window.location.href = "login.html";
                    });
                } else {
                    if (confirm("Do you want to logout?")) {
                        window.location.href = "login.html";
                    }
                }
            };
        } else {
            a.href = 'login.html';
            a.innerText = 'Login';
        }
        li.appendChild(a);
        navLinksList.appendChild(li);
    }

    // Setup desktop logout logic
    const desktopLogout = document.getElementById('logout-btn');
    if (desktopLogout) {
        desktopLogout.onclick = (e) => {
            e.preventDefault();
            if (window.showConfirm) {
                window.showConfirm("Do you want to logout?", () => {
                    window.location.href = "login.html";
                });
            } else {
                if (confirm("Do you want to logout?")) {
                    window.location.href = "login.html";
                }
            }
        };
    }

    document.addEventListener("click", (e) => {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && (!menuBtn || !menuBtn.contains(e.target))) {
                navLinks.classList.remove('active');
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initMobileNav);
} else {
    initMobileNav();
}

// Override default alert
window.alert = function(msg) {
    window.showToast(msg);
}