import { useState } from 'react';
import { Button, Card, Container, Form, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from './authApi';
import { useAuth } from './AuthContext';

interface FormValues {
    email: string;
    password: string;
}

export default function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: FormValues) => {
        setServerError(null);
        setLoading(true);
        try {
            const response = await signIn(values);
            login(response);
            navigate('/admin');
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
            setServerError(resp?.message || 'Unable to sign in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '100%', maxWidth: 420 }} className="shadow-sm">
                <Card.Body className="p-4">
                    <h4 className="mb-4 text-center">Admin Sign In</h4>

                    {serverError && <Alert variant="danger">{serverError}</Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="you@example.com"
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

                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                isInvalid={!!errors.password}
                                {...register('password', {
                                    required: 'The password field is required.',
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

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                            disabled={loading}
                        >
                            {loading ? <Spinner size="sm" animation="border" /> : 'Sign In'}
                        </Button>
                    </Form>

                    <div className="text-center mt-3 small">
                        Don&apos;t have an account? <Link to="/admin/signup">Sign Up</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}