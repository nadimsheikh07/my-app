import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

export type ThemeName = 'light' | 'dark';
export type BootstrapTheme = 'light' | 'dark';

export interface ThemeColors {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
}

export interface Theme {
    name: ThemeName;
    bootstrap: BootstrapTheme;
    colors: ThemeColors;
}

export const themes: Record<ThemeName, Theme> = {
    light: {
        name: 'light',
        bootstrap: 'light',
        colors: {
            primary: '#0d6efd',
            secondary: '#6c757d',
            success: '#198754',
            danger: '#dc3545',
        },
    },
    dark: {
        name: 'dark',
        bootstrap: 'dark',
        colors: {
            primary: '#3d8bfd',
            secondary: '#85888c',
            success: '#26b779',
            danger: '#e35d6a',
        },
    },
};

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
        <ThemeContext.Provider value={{ theme, themeName, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}