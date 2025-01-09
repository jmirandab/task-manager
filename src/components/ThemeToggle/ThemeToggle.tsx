'use client';

import { useTheme } from '@/context/themeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid var(--foreground)',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        position: 'fixed',
        right: '1em',
        top: '1em',
      }}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? '🌞 Light Mode' : '🌜 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
