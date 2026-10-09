import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/signin');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/admin">
                        Admin Panel
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin/users">
                                Users
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/blogs">
                                Blogs
                            </Nav.Link>
                        </Nav>
                        <Nav className="align-items-center">
                            <Navbar.Text className="me-3 text-white">
                                {user?.name}
                            </Navbar.Text>
                            <Button size="sm" variant="outline-light" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-4">
                <Outlet />
            </Container>
        </>
    );
}