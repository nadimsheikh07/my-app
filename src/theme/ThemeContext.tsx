import {
    createContext,
    use,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { themes, type Theme, type ThemeColors, type ThemeName } from './theme';


interface ThemeContextValue {
    theme: Theme;
    themeName: ThemeName;
    toggleTheme: () => void;
    setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'app-theme';

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeName;
}

export function ThemeProvider({
    children,
    defaultTheme = 'light',
}: ThemeProviderProps) {
    const [themeName, setThemeName] = useState<ThemeName>(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
        if (stored && stored in themes) return stored;
        return defaultTheme;
    });

    const theme = themes[themeName];

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme.bootstrap);
        localStorage.setItem(STORAGE_KEY, themeName);

        (Object.keys(theme.colors) as Array<keyof ThemeColors>).forEach((key) => {
            document.documentElement.style.setProperty(
                `--bs-${key}`,
                theme.colors[key]
            );
        });
    }, [theme, themeName]);

    const toggleTheme = (): void => {
        setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const setTheme = (name: ThemeName): void => {
        if (name in themes) setThemeName(name);
    };

    return (
        <ThemeContext value={{ theme, themeName, toggleTheme, setTheme }}>
            {children}
        </ThemeContext>
    );
}

export function useTheme(): ThemeContextValue {
    const context = use(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}