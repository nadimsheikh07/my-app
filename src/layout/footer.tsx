import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Github,
} from "react-bootstrap-icons";

export default function WebFooter() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/services", label: "Services" },
        { to: "/contact", label: "Contact" },
    ];

    const services = [
        { to: "/services/web", label: "Web Development" },
        { to: "/services/mobile", label: "Mobile Apps" },
        { to: "/services/ui-ux", label: "UI/UX Design" },
        { to: "/services/consulting", label: "Consulting" },
    ];

    const socials = [
        { href: "https://facebook.com", icon: <Facebook />, label: "Facebook" },
        { href: "https://twitter.com", icon: <Twitter />, label: "Twitter" },
        { href: "https://instagram.com", icon: <Instagram />, label: "Instagram" },
        { href: "https://linkedin.com", icon: <Linkedin />, label: "LinkedIn" },
        { href: "https://github.com", icon: <Github />, label: "GitHub" },
    ];

    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
            <Container>
                {/* Top Section */}
                <Row className="gy-4">
                    {/* Brand / About */}
                    <Col xs={12} md={6} lg={4}>
                        <h5 className="fw-bold mb-3">My React APP</h5>
                        <p className="text-secondary mb-3">
                            Building modern, scalable web applications with
                            React and Bootstrap. Fast, reliable, and beautifully
                            designed experiences.
                        </p>
                        <div className="d-flex gap-3">
                            {socials.map(({ href, icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-light fs-5 social-icon"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={6} md={3} lg={2}>
                        <h6 className="fw-bold text-uppercase mb-3">
                            Quick Links
                        </h6>
                        <ul className="list-unstyled">
                            {quickLinks.map(({ to, label }) => (
                                <li key={to} className="mb-2">
                                    <Link
                                        to={to}
                                        className="text-secondary text-decoration-none footer-link"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Services */}
                    <Col xs={6} md={3} lg={3}>
                        <h6 className="fw-bold text-uppercase mb-3">
                            Services
                        </h6>
                        <ul className="list-unstyled">
                            {services.map(({ to, label }) => (
                                <li key={to} className="mb-2">
                                    <Link
                                        to={to}
                                        className="text-secondary text-decoration-none footer-link"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Contact */}
                    <Col xs={12} md={12} lg={3}>
                        <h6 className="fw-bold text-uppercase mb-3">
                            Get in Touch
                        </h6>
                        <ul className="list-unstyled text-secondary">
                            <li className="mb-2">
                                📍 123 Main Street, City, Country
                            </li>
                            <li className="mb-2">
                                📞{" "}
                                <a
                                    href="tel:+1234567890"
                                    className="text-secondary text-decoration-none footer-link"
                                >
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="mb-2">
                                ✉️{" "}
                                <a
                                    href="mailto:info@myreactapp.com"
                                    className="text-secondary text-decoration-none footer-link"
                                >
                                    info@myreactapp.com
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>

                {/* Divider */}
                <hr className="border-secondary my-4" />

                {/* Bottom Section */}
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
                        <small className="text-secondary">
                            © {currentYear} My React APP. All rights reserved.
                        </small>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <small>
                            <Link
                                to="/privacy"
                                className="text-secondary text-decoration-none me-3 footer-link"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-secondary text-decoration-none footer-link"
                            >
                                Terms of Service
                            </Link>
                        </small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}