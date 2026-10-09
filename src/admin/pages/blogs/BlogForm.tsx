import { useEffect, useState } from 'react';
import { Button, Card, Form, Spinner, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, fetchBlog, updateBlog } from './blogApi';

interface FormValues {
    title: string;
    slug: string;
    content: string;
    author: string;
    published: boolean;
}

export default function BlogForm() {
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: '',
            slug: '',
            content: '',
            author: '',
            published: false,
        },
    });

    useEffect(() => {
        if (!isEdit || !id) return;
        setLoading(true);
        fetchBlog(id)
            .then((blog) => {
                reset({
                    title: blog.title,
                    slug: blog.slug || '',
                    content: blog.content,
                    author: blog.author || '',
                    published: !!blog.published,
                });
            })
            .catch(() => setServerError('Failed to load blog.'))
            .finally(() => setLoading(false));
    }, [id, isEdit, reset]);

    const onSubmit = async (values: FormValues) => {
        setSaving(true);
        setServerError(null);
        try {
            if (isEdit && id) {
                await updateBlog(id, values);
            } else {
                await createBlog(values);
            }
            navigate('/admin/blogs');
        } catch (err: any) {
            const resp = err?.response?.data;
            if (resp?.errors) {
                Object.entries(resp.errors).forEach(([field, msgs]) => {
                    setError(field as keyof FormValues, {
                        type: 'server',
                        message: (msgs as string[])[0],
                    });
                });
            }
            setServerError(resp?.message || 'Failed to save blog.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Card>
            <Card.Header>
                <h5 className="mb-0">{isEdit ? 'Edit Blog' : 'New Blog'}</h5>
            </Card.Header>
            <Card.Body>
                {serverError && <Alert variant="danger">{serverError}</Alert>}

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.title}
                            {...register('title', {
                                required: 'The title field is required.',
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.slug}
                            placeholder="my-blog-post"
                            {...register('slug', {
                                pattern: {
                                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                                    message: 'Slug must be lowercase, hyphen-separated.',
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.slug?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.author}
                            {...register('author')}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.author?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            isInvalid={!!errors.content}
                            {...register('content', {
                                required: 'The content field is required.',
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.content?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Check
                            type="switch"
                            id="published"
                            label="Published"
                            {...register('published')}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? <Spinner size="sm" animation="border" /> : 'Save'}
                    </Button>
                    <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => navigate('/admin/blogs')}
                    >
                        Cancel
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}