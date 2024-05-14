import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
// import {Appearance, ColorSchemeName} from 'react-native';

type ThemeType = {
  light: {
    containerBackground: string;
    textColor: string;
    borderColor: string;
    iconColor: string;
    transparentBlack: string;
    pPrimary: string;
    pSecondary: string;
    tertiary: string;
    accent: string;
    pBackground: string;
  };
  dark: {
    containerBackground: string;
    textColor: string;
    borderColor: string;
    iconColor: string;
    transparentBlack: string;
    pPrimary: string;
    pSecondary: string;
    tertiary: string;
    accent: string;
    pBackground: string;
  };
};

type ThemeContextType = {
  theme: {
    containerBackground: string;
    textColor: string;
    borderColor: string;
    iconColor: string;
    transparentBlack: string;
    pPrimary: string;
    pSecondary: string;
    tertiary: string;
    accent: string;
    pBackground: string;
  };
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const theme: ThemeType = {
  light: {
    containerBackground: '#fff',
    textColor: '#2E3D48',
    borderColor: '#dddadd',
    iconColor: '#000',
    transparentBlack: 'rgba(0, 0, 0, 0.5)',
    pPrimary: '#9747FF',
    pSecondary: '#C89EFF',
    tertiary: '#0E2A52',
    accent: '#2D3E8B',
    pBackground: '#7752d5',
  },
  dark: {
    containerBackground: 'black',
    textColor: '#fff',
    borderColor: '#fff',
    iconColor: '#fff',
    transparentBlack: 'rgba(0, 0, 0, 0.5)',
    pPrimary: '#9747FF',
    pSecondary: '#C89EFF',
    tertiary: '#3700B3',
    accent: '#6200EE',
    pBackground: '#fff',
  },
};

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [mode, setMode] = useState<ColorSchemeName>(
    Appearance.getColorScheme(),
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setMode(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = theme[mode || 'light'];

  return (
    <ThemeContext.Provider value={{theme: currentTheme, toggleMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
