import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import {
    Link,
    NavLink as RouterNavLink,
    Outlet,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import './AdminLayout.css';

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // `true` = sidebar expanded on desktop
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // `true` = mobile drawer open
    const [mobileOpen, setMobileOpen] = useState(false);

    // Auto-close mobile drawer on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const handleLogout = () => {
        logout();
        navigate('/admin/signin');
    };

    // On desktop this toggles the collapse; on mobile it opens the drawer.
    const toggleSidebar = () => {
        if (window.matchMedia('(max-width: 991.98px)').matches) {
            setMobileOpen((v) => !v);
        } else {
            setSidebarOpen((v) => !v);
        }
    };

    const closeMobileDrawer = () => setMobileOpen(false);

    return (
        <div
            className={[
                'admin-shell',
                sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed',
                mobileOpen ? 'mobile-open' : '',
            ].join(' ')}
        >
            {/* ============ BACKDROP (mobile) ============ */}
            <div
                className="admin-backdrop"
                onClick={closeMobileDrawer}
                aria-hidden={!mobileOpen}
            />

            {/* ============ SIDEBAR ============ */}
            <aside className="admin-sidebar" role="navigation">
                <div className="admin-sidebar-brand">
                    <Link to="/admin" className="text-decoration-none" onClick={closeMobileDrawer}>
                        <span className="brand-icon">⚡</span>
                        <span className="brand-text">Admin Panel</span>
                    </Link>

                    {/* Close button (mobile only) */}
                    <button
                        type="button"
                        className="sidebar-close-btn d-lg-none"
                        onClick={closeMobileDrawer}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                <Nav className="admin-sidebar-nav flex-column">
                    <RouterNavLink to="/admin/users" className="admin-nav-link">
                        <span className="nav-icon">👥</span>
                        <span className="nav-text">Users</span>
                    </RouterNavLink>
                    <RouterNavLink to="/admin/blogs" className="admin-nav-link">
                        <span className="nav-icon">📝</span>
                        <span className="nav-text">Blogs</span>
                    </RouterNavLink>
                </Nav>

                <div className="admin-sidebar-footer">
                    <RouterNavLink to="/" className="admin-nav-link">
                        <span className="nav-icon">🏠</span>
                        <span className="nav-text">Back to Site</span>
                    </RouterNavLink>
                </div>
            </aside>

            {/* ============ MAIN ============ */}
            <div className="admin-main">
                {/* ============ HEADER ============ */}
                <Navbar bg="white" className="admin-header border-bottom" expand="lg">
                    <Container fluid className="px-2 px-sm-3 h-100 d-flex align-items-center">
                        <Button
                            variant="link"
                            className="sidebar-toggle text-dark p-2 me-1 me-sm-2"
                            onClick={toggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            ☰
                        </Button>

                        <span className="admin-header-title d-none d-sm-inline text-muted small">
                            Dashboard
                        </span>

                        <div className="ms-auto d-flex align-items-center">
                            <div className="user-avatar me-2">
                                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </div>
                            <div className="d-none d-md-block me-3">
                                <div className="fw-semibold small lh-1 text-truncate" style={{ maxWidth: 160 }}>
                                    {user?.name}
                                </div>
                                <div className="text-muted text-truncate" style={{ fontSize: '0.75rem', maxWidth: 160 }}>
                                    {user?.email}
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                <span className="d-none d-sm-inline">Logout</span>
                                <span className="d-sm-none">⏻</span>
                            </Button>
                        </div>
                    </Container>
                </Navbar>

                {/* ============ CONTENT ============ */}
                <main className="admin-content">
                    <Container fluid className="py-3 py-md-4 px-2 px-sm-3">
                        <Outlet />
                    </Container>
                </main>
            </div>
        </div>
    );
}