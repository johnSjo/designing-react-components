import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IThemeContext {
  readonly theme: string;
  readonly setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

export function ThemeProvider({ startTheme, children }) {
  const [theme, setTheme] = useState(startTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
