import { Button } from 'react-bootstrap';
import { useTheme } from '../theme/ThemeContext';

export default function ThemeToggle() {
    const { themeName, toggleTheme } = useTheme();

    return (
        <Button
            variant={themeName === 'dark' ? 'outline-light' : 'outline-dark'}
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {themeName === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </Button>
    );
}