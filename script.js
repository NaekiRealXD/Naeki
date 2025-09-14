const body = document.body;

const openMenuButton = document.getElementById('open-menu-button');
const menuOverlay = document.getElementById('menu-overlay');
const customizationMenu = document.getElementById('customization-menu');
const closeMenuButton = document.getElementById('close-menu-button');
const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const bioSection = document.getElementById('bio');
const originalBioText = bioSection.querySelector('p').textContent;

let currentLanguage = 'es';

body.classList.add('no-transition');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
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
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
});

languageSelect.addEventListener('change', async (event) => {
    const selectedLanguage = event.target.value;

    if (selectedLanguage === currentLanguage) {
        return;
    }

    if (selectedLanguage === 'es') {
        bioSection.querySelector('p').textContent = originalBioText;
        currentLanguage = 'es';
        return;
    }

    const textToTranslate = originalBioText;
    const sourceLang = currentLanguage;
    const targetLang = selectedLanguage;

    const libreTranslateApiUrl = 'https://translate.argosopentech.com/translate';

    try {
        const response = await fetch(libreTranslateApiUrl, {
            method: 'POST',
            body: JSON.stringify({
                q: textToTranslate,
                source: sourceLang,
                target: targetLang,
                format: 'text',
                api_key: ''
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        if (data.translatedText) {
            bioSection.querySelector('p').textContent = data.translatedText;
            currentLanguage = selectedLanguage;
        } else {
            console.error('Translation failed:', data);
        }
    } catch (error) {
        console.error('Error during translation:', error);
    }
});

setTimeout(() => {
    body.classList.remove('no-transition');
}, 10);