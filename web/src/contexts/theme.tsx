import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

interface ThemeContextData {
  lightOn: boolean;
  toggle(light?: boolean): void;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [lightOn, setLightOn] = useState<boolean>(true);

  useEffect(() => {
    const storedLightOn = localStorage.getItem('@theme:lightOn');
    if (storedLightOn)
      setLightOn(JSON.parse(storedLightOn));
  }, []);

  function toggle(light?: boolean) {
    console.log('Toggle!');
    if (light === undefined) {
      toggle(!lightOn);
      return;
    }

    setLightOn(light);
    localStorage.setItem('@theme:lightOn', JSON.stringify(light));
  }

  return (
    <ThemeProvider theme={lightOn ? light : dark}>
      <ThemeContext.Provider value={{ lightOn, toggle }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}