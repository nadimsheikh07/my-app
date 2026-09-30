import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { CodeSlash, MoonStarsFill, SunFill } from 'react-bootstrap-icons';
import { useTheme } from '../theme/ThemeContext';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
];

const WebHeader = () => {
    const { themeName, toggleTheme } = useTheme();
    const isDark = themeName === 'dark';

    return (
        <Navbar
            expand="lg"
            sticky="top"
            className="shadow-sm py-3"
            bg={isDark ? 'dark' : 'white'}
            data-bs-theme={themeName}
        >
            <Container>
                {/* Brand with icon */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className={`d-flex align-items-center gap-2 fw-bold fs-4 ${isDark ? 'text-info' : 'text-primary'
                        }`}
                >
                    <CodeSlash size={26} />
                    <span>My React APP</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar-nav" />

                <Navbar.Collapse id="main-navbar-nav">
                    {/* Center nav links */}
                    <Nav className="mx-auto my-3 my-lg-0 gap-lg-2">
                        {navLinks.map(({ to, label }) => (
                            <Nav.Link
                                key={to}
                                as={NavLink}
                                to={to}
                                end={to === '/'}
                            >
                                {label}
                            </Nav.Link>
                        ))}
                    </Nav>

                    {/* Right-side CTA + theme toggle */}
                    <div className="d-flex gap-2 flex-column flex-lg-row align-items-stretch align-items-lg-center">
                        {/* Theme toggle */}
                        <Button
                            variant={isDark ? 'outline-light' : 'outline-secondary'}
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            className="rounded-circle d-inline-flex align-items-center justify-content-center p-0"
                            style={{ width: 40, height: 40 }}
                        >
                            {isDark ? <SunFill size={18} /> : <MoonStarsFill size={18} />}
                        </Button>

                        <Button
                            as={Link as any}
                            to="/login"
                            variant="outline-primary"
                            className="rounded-pill px-4"
                        >
                            Login
                        </Button>
                        <Button
                            as={Link as any}
                            to="/signup"
                            variant="primary"
                            className="rounded-pill px-4"
                        >
                            Get Started
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default WebHeader;