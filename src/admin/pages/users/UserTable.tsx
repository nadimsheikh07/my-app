import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Form,
    InputGroup,
    Spinner,
    Table,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, fetchUsers, type User } from './userApi';

type SortField = 'name' | 'email' | 'mobile' | 'createdAt';

export default function UserTable() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState<SortField>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => clearTimeout(handler);
    }, [search]);

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchUsers({
                page,
                limit,
                search: debouncedSearch || undefined,
                sortBy,
                sortOrder,
            });
            setUsers(result.data ?? []);
            setTotal(result.total ?? (result.data?.length || 0));
        } catch {
            setError('Failed to load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, debouncedSearch, sortBy, sortOrder]);

    const handleSort = (field: SortField) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this user?')) return;
        try {
            await deleteUser(id);
            load();
        } catch {
            alert('Failed to delete user.');
        }
    };

    const sortIndicator = (field: SortField) =>
        sortBy === field ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Users</h5>
                <Button as={Link as any} to="/admin/users/new" variant="primary" size="sm">
                    + New User
                </Button>
            </Card.Header>
            <Card.Body>
                <InputGroup className="mb-3" style={{ maxWidth: 360 }}>
                    <Form.Control
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>

                {error && <div className="text-danger mb-2">{error}</div>}

                <div className="table-responsive">
                    <Table striped hover bordered>
                        <thead>
                            <tr>
                                <th
                                    role="button"
                                    onClick={() => handleSort('name')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Name{sortIndicator('name')}
                                </th>
                                <th
                                    role="button"
                                    onClick={() => handleSort('email')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Email{sortIndicator('email')}
                                </th>
                                <th
                                    role="button"
                                    onClick={() => handleSort('mobile')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Mobile{sortIndicator('mobile')}
                                </th>
                                <th
                                    role="button"
                                    onClick={() => handleSort('createdAt')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Created{sortIndicator('createdAt')}
                                </th>
                                <th style={{ width: 160 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        <Spinner animation="border" size="sm" />
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u._id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.mobile}</td>
                                        <td>
                                            {u.createdAt
                                                ? new Date(u.createdAt).toLocaleDateString()
                                                : '-'}
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                className="me-2"
                                                onClick={() => navigate(`/admin/users/${u._id}/edit`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline-danger"
                                                onClick={() => handleDelete(u._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">
                        Page {page} of {totalPages} ({total} total)
                    </span>
                    <div>
                        <Button
                            size="sm"
                            variant="outline-primary"
                            className="me-2"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Prev
                        </Button>
                        <Button
                            size="sm"
                            variant="outline-primary"
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}