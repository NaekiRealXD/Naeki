const body = document.body;

const openMenuButton = document.getElementById('open-menu-button');
const menuOverlay = document.getElementById('menu-overlay');
const customizationMenu = document.getElementById('customization-menu');
const closeMenuButton = document.getElementById('close-menu-button');
const themeToggle = document.getElementById('theme-toggle');
const themeSwitchThumb = themeToggle.querySelector('.switch-thumb');
const errorMessage = document.getElementById('error-message');

body.classList.add('no-transition');

// Función para mostrar mensajes de error
function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000); // Ocultar después de 5 segundos
}

// Aplicar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeSwitchThumb.style.transform = 'translateX(30px)';
    }
}

// Abrir menú
openMenuButton.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    customizationMenu.classList.add('active');
});

// Cerrar menú
closeMenuButton.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    customizationMenu.classList.remove('active');
});

// Cerrar menú al hacer clic fuera
menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
        menuOverlay.classList.remove('active');
        customizationMenu.classList.remove('active');
    }
});

// Cambiar tema
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

// Detectar estado de la red
window.addEventListener('offline', () => {
    showErrorMessage('No hay conexión a internet.');
});

window.addEventListener('online', () => {
    // Opcional: ocultar el mensaje si la conexión vuelve.
    if (errorMessage.textContent === 'No hay conexión a internet.') {
        errorMessage.classList.remove('show');
    }
});

// Capturar errores globales
window.onerror = function(message, source, lineno, colno, error) {
    showErrorMessage('Ocurrió un error inesperado.');
    return true; // Prevenir que el error se muestre en la consola
};


// Eliminar transiciones iniciales
setTimeout(() => {
    body.classList.remove('no-transition');
}, 10);