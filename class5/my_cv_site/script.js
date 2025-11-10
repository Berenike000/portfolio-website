console.log("CV page loaded");

(function () {
    const button = document.getElementById('toggle-bg-btn');
    if (!button) return;

    const THEME_KEY = 'preferred-theme';

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('theme-dark', isDark);
        document.body.classList.toggle('theme-light', !isDark);
        button.setAttribute('aria-pressed', String(isDark));
        button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        button.textContent = isDark ? '🌙' : '☀️';
    }

    function getSystemPreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const stored = localStorage.getItem(THEME_KEY);
    const initialTheme = stored === 'dark' || stored === 'light' ? stored : getSystemPreference();
    applyTheme(initialTheme);

    button.addEventListener('click', function () {
        const next = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem(THEME_KEY, next);
        } catch (e) {
            // ignore storage errors
        }
    });
})();

// Animate/emphasise skills on hover
(function () {
    // Insert the emphasis CSS only once
    if (!document.getElementById('skills-emphasis-style')) {
        const style = document.createElement('style');
        style.id = 'skills-emphasis-style';
        style.textContent = `
.skills li {
    transition: 
        transform 0.18s cubic-bezier(.22,1,.36,1), 
        box-shadow 0.19s cubic-bezier(.22,1,.36,1), 
        background 0.18s;
}
.skills li.skills-animate {
    z-index: 2;
    position: relative;
    background-color: var(--accent);
    color: var(--card);
    transform: scale(1.13);
    box-shadow: 0 3px 14px 0 rgba(0,0,0,0.08), 0 0 0 2px var(--accent);
    font-weight: 600;
    cursor: pointer;
}
        `;
        document.head.appendChild(style);
    }

    const skillItems = document.querySelectorAll('.skills li');
    skillItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            item.classList.add('skills-animate');
        });
        item.addEventListener('mouseleave', function() {
            item.classList.remove('skills-animate');
        });
        // For accessibility: focus/blur for keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('focus', function() {
            item.classList.add('skills-animate');
        });
        item.addEventListener('blur', function() {
            item.classList.remove('skills-animate');
        });
    });
})();