import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { CodeSlash } from 'react-bootstrap-icons';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
];

const WebHeader = () => {
    return (
        <Navbar
            expand="lg"
            sticky="top"
            className="bg-white shadow-sm py-3"
        >
            <Container>
                {/* Brand with icon */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="d-flex align-items-center gap-2 fw-bold fs-4 text-primary"
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

                    {/* Right-side CTA */}
                    <div className="d-flex gap-2 flex-column flex-lg-row">
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