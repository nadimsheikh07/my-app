import { useEffect, useState } from 'react';
import {
    Badge,
    Button,
    Card,
    Form,
    InputGroup,
    Spinner,
    Table,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { type Blog, deleteBlog, fetchBlogs } from './blogApi';

type SortField = 'title' | 'author' | 'createdAt';

export default function BlogTable() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState<SortField>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
            const result = await fetchBlogs({
                page,
                limit,
                search: debouncedSearch || undefined,
                sortBy,
                sortOrder,
            });
            setBlogs(result.data ?? []);
            setTotal(result.total ?? (result.data?.length || 0));
        } catch {
            setError('Failed to load blogs.');
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
        if (!window.confirm('Delete this blog?')) return;
        try {
            await deleteBlog(id);
            load();
        } catch {
            alert('Failed to delete blog.');
        }
    };

    const sortIndicator = (field: SortField) =>
        sortBy === field ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Blogs</h5>
                <Button as={Link as any} to="/admin/blogs/new" variant="primary" size="sm">
                    + New Blog
                </Button>
            </Card.Header>
            <Card.Body>
                <InputGroup className="mb-3" style={{ maxWidth: 360 }}>
                    <Form.Control
                        placeholder="Search blogs..."
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
                                    onClick={() => handleSort('title')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Title{sortIndicator('title')}
                                </th>
                                <th
                                    role="button"
                                    onClick={() => handleSort('author')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Author{sortIndicator('author')}
                                </th>
                                <th>Status</th>
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
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        No blogs found.
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((b) => (
                                    <tr key={b._id}>
                                        <td>{b.title}</td>
                                        <td>{b.author || '-'}</td>
                                        <td>
                                            <Badge bg={b.published ? 'success' : 'secondary'}>
                                                {b.published ? 'Published' : 'Draft'}
                                            </Badge>
                                        </td>
                                        <td>
                                            {b.createdAt
                                                ? new Date(b.createdAt).toLocaleDateString()
                                                : '-'}
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                className="me-2"
                                                onClick={() => navigate(`/admin/blogs/${b._id}/edit`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline-danger"
                                                onClick={() => handleDelete(b._id)}
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