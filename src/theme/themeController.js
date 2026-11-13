const STORAGE_KEY = 'portfolio-theme-preference';
const THEME_CLASSES = ['theme-beige', 'theme-amber', 'theme-green', 'theme-cyan'];
const PREFERENCES = ['auto', 'light', 'dark', 'green', 'cyan'];

let preference = 'auto';
let activeTheme = null;
let initialized = false;
let clockTimer = null;
let visibilityHandler = null;
let storageHandler = null;

export function resolveTheme(mode, now = new Date()) {
  if (mode === 'auto') return now.getHours() >= 7 && now.getHours() < 19 ? 'beige' : 'amber';
  if (mode === 'light') return 'beige';
  if (mode === 'dark') return 'amber';
  return mode;
}

export function getThemePreference() {
  return preference;
}

export function getActiveTheme() {
  return activeTheme ?? resolveTheme(preference);
}

function applyTheme() {
  const next = resolveTheme(preference);
  if (next === activeTheme) return false;

  document.body.classList.remove(...THEME_CLASSES);
  document.body.classList.add(`theme-${next}`);
  document.documentElement.style.colorScheme = next === 'beige' ? 'light' : 'dark';
  activeTheme = next;
  return true;
}

function announceTheme() {
  window.dispatchEvent(new CustomEvent('portfolio:theme-change', {
    detail: { preference, theme: activeTheme },
  }));
}

export function setThemePreference(mode) {
  const next = mode === 'beige' ? 'light' : mode === 'amber' ? 'dark' : mode;
  if (!PREFERENCES.includes(next)) return false;

  preference = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage may be unavailable */ }
  applyTheme();
  announceTheme();
  return true;
}

export function initializeTheme() {
  if (initialized) return;
  initialized = true;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (PREFERENCES.includes(saved)) preference = saved;
  } catch { /* use automatic mode */ }

  applyTheme();
  announceTheme();

  const refreshAutoTheme = () => {
    if (preference === 'auto' && applyTheme()) announceTheme();
  };
  clockTimer = window.setInterval(refreshAutoTheme, 30_000);
  visibilityHandler = refreshAutoTheme;
  document.addEventListener('visibilitychange', visibilityHandler);
  storageHandler = event => {
    if (event.key !== STORAGE_KEY) return;
    preference = PREFERENCES.includes(event.newValue) ? event.newValue : 'auto';
    applyTheme();
    announceTheme();
  };
  window.addEventListener('storage', storageHandler);
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (clockTimer) window.clearInterval(clockTimer);
    if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler);
    if (storageHandler) window.removeEventListener('storage', storageHandler);
  });
}
