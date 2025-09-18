const body = document.body;

const openMenuButton = document.getElementById('open-menu-button');
const menuOverlay = document.getElementById('menu-overlay');
const customizationMenu = document.getElementById('customization-menu');
const closeMenuButton = document.getElementById('close-menu-button');
const themeToggle = document.getElementById('theme-toggle');
const themeSwitchThumb = themeToggle.querySelector('.switch-thumb');
const errorMessage = document.getElementById('error-message');

body.classList.add('no-transition');

function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeSwitchThumb.style.transform = 'translateX(30px)';
    }
}

openMenuButton.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    customizationMenu.classList.add('active');
});

closeMenuButton.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    customizationMenu.classList.remove('active');
});

menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
        menuOverlay.classList.remove('active');
        customizationMenu.classList.remove('active');
    }
});

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
        themeSwitchThumb.style.transform = 'translateX(3px)';
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        themeSwitchThumb.style.transform = 'translateX(30px)';
    }
});

window.addEventListener('offline', () => {
    showErrorMessage('No hay conexión a internet.');
});

window.addEventListener('online', () => {
    if (errorMessage.textContent === 'No hay conexión a internet.') {
        errorMessage.classList.remove('show');
    }
});

window.onerror = function(message, source, lineno, colno, error) {
    showErrorMessage('Ocurrió un error inesperado.');
    return true;
};

function checkSpecialDate() {
    const now = new Date();
    const santiagoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Santiago" }));
    const isSpecialDate = santiagoTime.getDate() === 18 && santiagoTime.getMonth() === 8;

    if (isSpecialDate) {
        body.classList.add('special-theme');
        body.classList.remove('dark-mode', 'light-mode');

        openMenuButton.disabled = true;
        openMenuButton.style.cursor = 'not-allowed';
        openMenuButton.style.opacity = '0.5';

        showErrorMessage('¡Feliz 18 de septiembre! Tema especial activado.');
    }
}

function addSpecialThemeText() {
    if (body.classList.contains('special-theme')) {
        const subtitle = document.querySelector('.subtitle');

        if (subtitle) {
            const specialText = document.createElement('p');
            specialText.id = 'special-theme-text';
            specialText.textContent = '🇨🇱 ¡Feliz 18 de septiembre! Tema especial activado. 🇨🇱';
            specialText.style.color = 'var(--text-color)';
            specialText.style.fontSize = '1rem';
            specialText.style.marginTop = '10px';
            specialText.style.textAlign = 'center';

            subtitle.insertAdjacentElement('afterend', specialText);
        }
    }
}

function createFlyingFlags() {
    if (body.classList.contains('special-theme')) {
        for (let i = 0; i < 50; i++) {
            const flag = document.createElement('div');
            flag.textContent = '🇨🇱';
            flag.classList.add('flying-flag');
            flag.style.left = `${Math.random() * 100}vw`;
            flag.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(flag);
        }
    }
}

function addHatToProfile() {
    if (body.classList.contains('special-theme')) {
        const profileContainer = document.querySelector('.profile-picture-container');

        if (profileContainer) {
            const hat = document.createElement('img');
            hat.src = 'Imagenes/gorro.png';
            hat.alt = 'Gorro';
            hat.classList.add('hat');
            profileContainer.appendChild(hat);

            hat.style.display = 'block';
        }
    }
}

checkSpecialDate();
addSpecialThemeText();
createFlyingFlags();
addHatToProfile();