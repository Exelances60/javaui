import setGlobalColorTheme, { ThemeName } from "@/lib/theme-colors";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  color: ThemeName;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setColor: (color: ThemeName) => void;
};

const initialState: ThemeProviderState = {
  color: "Zinc",
  theme: "system",
  setTheme: () => null,
  setColor: () => null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [color, setColor] = useState<ThemeName>(
    () => (localStorage.getItem("vite-ui-color") as ThemeName) || "Zinc"
  );
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      setGlobalColorTheme(color, systemTheme);
      return;
    }
    setGlobalColorTheme(color, theme);
    root.classList.add(theme);
  }, [theme, color]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    color,
    setColor: (color: ThemeName) => {
      localStorage.setItem("vite-ui-color", color);
      setColor(color);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
