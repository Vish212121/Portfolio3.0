import { useEffect, useState } from 'react';
import { getThemePreference, setThemePreference } from '../theme/themeController.js';

const OPTIONS = [
  { mode: 'auto', label: 'AUTO', description: 'Automatic theme: light 7 AM–7 PM, dark at night' },
  { mode: 'light', label: '☀', description: 'Light beige theme' },
  { mode: 'dark', label: '☾', description: 'Dark terminal theme' },
];

export default function ThemeSwitch() {
  const [selected, setSelected] = useState(getThemePreference);

  useEffect(() => {
    const update = () => setSelected(getThemePreference());
    window.addEventListener('portfolio:theme-change', update);
    return () => window.removeEventListener('portfolio:theme-change', update);
  }, []);

  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      {OPTIONS.map(({ mode, label, description }) => (
        <button
          key={mode}
          type="button"
          className="theme-switch-option"
          aria-label={description}
          aria-pressed={selected === mode}
          title={description}
          onClick={() => setThemePreference(mode)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
