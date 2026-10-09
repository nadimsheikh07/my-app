import { useState } from 'react';
import { Button, Card, Container, Form, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from './authApi';
import { useAuth } from './AuthContext';

interface FormValues {
    name: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
        },
    });

    const password = watch('password');

    const onSubmit = async (values: FormValues) => {
        setServerError(null);
        setLoading(true);
        try {
            const { confirmPassword, ...payload } = values;
            const response = await signUp(payload);
            console.log("response", response)
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
            setServerError(resp?.message || 'Unable to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 py-4">
            <Card style={{ width: '100%', maxWidth: 480 }} className="shadow-sm">
                <Card.Body className="p-4">
                    <h4 className="mb-4 text-center">Admin Sign Up</h4>

                    {serverError && <Alert variant="danger">{serverError}</Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John Doe"
                                isInvalid={!!errors.name}
                                {...register('name', {
                                    required: 'The name field is required.',
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

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

                        <Form.Group className="mb-3" controlId="mobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="+1 555 000 0000"
                                isInvalid={!!errors.mobile}
                                {...register('mobile', {
                                    required: 'The mobile field is required.',
                                    pattern: {
                                        value: /^[0-9+\-\s()]{7,15}$/,
                                        message: 'Enter a valid mobile number.',
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.mobile?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
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

                        <Form.Group className="mb-4" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                isInvalid={!!errors.confirmPassword}
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password.',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match.',
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                            disabled={loading}
                        >
                            {loading ? <Spinner size="sm" animation="border" /> : 'Sign Up'}
                        </Button>
                    </Form>

                    <div className="text-center mt-3 small">
                        Already have an account? <Link to="/admin/signin">Sign In</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}