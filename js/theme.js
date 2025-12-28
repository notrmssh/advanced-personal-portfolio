document.addEventListener('DOMContentLoaded', function () {
  const themeButtons = document.querySelectorAll('.theme-btn');
  const body = document.body;

  function saveTheme(theme) {
    document.cookie =
      'selectedTheme=' + theme + '; max-age=' + 60 * 60 * 24 * 30 + '; path=/';
  }

  function applyTheme(theme) {

    body.classList.remove('light-theme', 'dark-theme', 'blue-theme');

    if (theme === 'light') {
      body.classList.add('light-theme');
    } else if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else if (theme === 'blue') {
      body.classList.add('blue-theme');
    }

    themeButtons.forEach(function (btn) {
      if (btn.dataset.theme === theme) {
        btn.classList.add('active-theme');
      } else {
        btn.classList.remove('active-theme');
      }
    });

    saveTheme(theme);
  }

  function loadTheme() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('selectedTheme=')) {
        const theme = cookie.substring('selectedTheme='.length);
        applyTheme(theme);
        return;
      }
    }

    applyTheme('dark');
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const selectedTheme = btn.dataset.theme;
      applyTheme(selectedTheme);
    });
  });

  loadTheme();
});
