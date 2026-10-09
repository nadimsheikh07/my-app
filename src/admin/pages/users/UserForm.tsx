import { useEffect, useState } from 'react';
import { Button, Card, Form, Spinner, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, fetchUser, updateUser } from './userApi';

interface FormValues {
    name: string;
    email: string;
    mobile: string;
    password: string;
}

export default function UserForm() {
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
        defaultValues: { name: '', email: '', mobile: '', password: '' },
    });

    useEffect(() => {
        if (!isEdit || !id) return;
        setLoading(true);
        fetchUser(id)
            .then((user) => {
                reset({
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    password: '',
                });
            })
            .catch(() => setServerError('Failed to load user.'))
            .finally(() => setLoading(false));
    }, [id, isEdit, reset]);

    const onSubmit = async (values: FormValues) => {
        setSaving(true);
        setServerError(null);
        try {
            const payload: any = { ...values };
            if (isEdit && !payload.password) delete payload.password;

            if (isEdit && id) {
                await updateUser(id, payload);
            } else {
                await createUser(payload);
            }
            navigate('/admin/users');
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
            setServerError(resp?.message || 'Failed to save user.');
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
                <h5 className="mb-0">{isEdit ? 'Edit User' : 'New User'}</h5>
            </Card.Header>
            <Card.Body>
                {serverError && <Alert variant="danger">{serverError}</Alert>}

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.name}
                            {...register('name', { required: 'The name field is required.' })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            isInvalid={!!errors.email}
                            {...register('email', {
                                required: 'The email field is required.',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email address.',
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.mobile}
                            {...register('mobile', {
                                required: 'The mobile field is required.',
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.mobile?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>
                            Password {isEdit && <small className="text-muted">(leave blank to keep current)</small>}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={!!errors.password}
                            {...register('password', {
                                required: isEdit ? false : 'The password field is required.',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters.',
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? <Spinner size="sm" animation="border" /> : 'Save'}
                    </Button>
                    <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => navigate('/admin/users')}
                    >
                        Cancel
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}