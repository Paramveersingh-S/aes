import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const BREATHING_STYLES = [
  {
    id: 'hinokami',
    name: 'Hinokami Kagura',
    kanji: '日ノ呼吸',
    form: 'Sun / Flame',
    color: '#ff2a54',
    secondary: '#f59e0b'
  },
  {
    id: 'water',
    name: 'Water Breathing',
    kanji: '水の呼吸',
    form: 'Nichirin Cyan',
    color: '#00f0ff',
    secondary: '#3b82f6'
  },
  {
    id: 'thunder',
    name: 'Thunder Breathing',
    kanji: '雷の呼吸',
    form: 'Hekireki Issen',
    color: '#facc15',
    secondary: '#38bdf8'
  },
  {
    id: 'moon',
    name: 'Moon & Wisteria',
    kanji: '月の呼吸',
    form: 'Wisteria Void',
    color: '#c084fc',
    secondary: '#ff2a54'
  }
];

export const ThemeProvider = ({ children }) => {
  const [isDarkMode] = useState(true);
  const [breathingStyle, setBreathingStyle] = useState('hinokami');

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-breathing', breathingStyle);
  }, [breathingStyle]);

  const cycleBreathingStyle = () => {
    const idx = BREATHING_STYLES.findIndex(s => s.id === breathingStyle);
    const next = BREATHING_STYLES[(idx + 1) % BREATHING_STYLES.length];
    setBreathingStyle(next.id);
  };

  const currentStyleObj = BREATHING_STYLES.find(s => s.id === breathingStyle) || BREATHING_STYLES[0];

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      breathingStyle,
      setBreathingStyle,
      cycleBreathingStyle,
      currentStyleObj,
      breathingStyles: BREATHING_STYLES
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
