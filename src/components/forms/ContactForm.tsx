import { useForm, type SubmitHandler } from "react-hook-form";
import {
    Form,
    Button,
    Row,
    Col,
    Card,
    Spinner,
    Alert,
} from "react-bootstrap";
import { useState } from "react";
import {
    Person,
    Envelope,
    Telephone,
    ChatLeftText,
    Send,
    CheckCircle,
} from "react-bootstrap-icons";

type FormData = {
    name: string;
    email: string;
    mobile: string;
    subject: string;
    message: string;
};

export default function ContactForm() {
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        mode: "onTouched",
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("formData", data);
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
    };

    return (
        <div className="py-5 bg-light min-vh-100">
            <div className="container" style={{ maxWidth: 800 }}>
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5 mb-2">Get in Touch</h1>
                    <p className="text-muted">
                        Have a question or want to work together? Drop us a
                        message and we'll get back to you shortly.
                    </p>
                </div>

                {/* Success Alert */}
                {showSuccess && (
                    <Alert
                        variant="success"
                        dismissible
                        onClose={() => setShowSuccess(false)}
                        className="d-flex align-items-center gap-2 border-0 shadow-sm"
                    >
                        <CheckCircle size={20} />
                        <span>
                            Thank you! Your message has been sent successfully.
                        </span>
                    </Alert>
                )}

                {/* Form Card */}
                <Card className="border-0 shadow-sm rounded-4">
                    <Card.Body className="p-4 p-md-5">
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                        >
                            <Row className="g-4">
                                {/* Name */}
                                <Col md={6}>
                                    <Form.Group controlId="name">
                                        <Form.Label className="fw-semibold">
                                            Name
                                        </Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <Person className="text-muted" />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                placeholder="John Doe"
                                                isInvalid={!!errors.name}
                                                {...register("name", {
                                                    required:
                                                        "Name is required",
                                                    minLength: {
                                                        value: 2,
                                                        message:
                                                            "Name must be at least 2 characters",
                                                    },
                                                })}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name?.message}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                </Col>

                                {/* Email */}
                                <Col md={6}>
                                    <Form.Group controlId="email">
                                        <Form.Label className="fw-semibold">
                                            Email
                                        </Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <Envelope className="text-muted" />
                                            </span>
                                            <Form.Control
                                                type="email"
                                                placeholder="john@example.com"
                                                isInvalid={!!errors.email}
                                                {...register("email", {
                                                    required:
                                                        "Email is required",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message:
                                                            "Enter a valid email address",
                                                    },
                                                })}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email?.message}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                </Col>

                                {/* Mobile */}
                                <Col md={6}>
                                    <Form.Group controlId="mobile">
                                        <Form.Label className="fw-semibold">
                                            Mobile
                                        </Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <Telephone className="text-muted" />
                                            </span>
                                            <Form.Control
                                                type="tel"
                                                placeholder="9876543210"
                                                isInvalid={!!errors.mobile}
                                                {...register("mobile", {
                                                    required:
                                                        "Mobile is required",
                                                    validate: (value) =>
                                                        /^\d{10}$/.test(
                                                            value.replace(
                                                                /\D/g,
                                                                ""
                                                            )
                                                        ) ||
                                                        "Enter a valid 10-digit mobile number",
                                                })}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.mobile?.message}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                </Col>

                                {/* Subject */}
                                <Col md={6}>
                                    <Form.Group controlId="subject">
                                        <Form.Label className="fw-semibold">
                                            Subject
                                        </Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <ChatLeftText className="text-muted" />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                placeholder="How can we help?"
                                                isInvalid={!!errors.subject}
                                                {...register("subject")}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.subject?.message}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                </Col>

                                {/* Message */}
                                <Col xs={12}>
                                    <Form.Group controlId="message">
                                        <Form.Label className="fw-semibold">
                                            Message
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Write your message here..."
                                            isInvalid={!!errors.message}
                                            style={{ resize: "vertical" }}
                                            {...register("message", {
                                                required:
                                                    "Message is required",
                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "Message must be at least 10 characters",
                                                },
                                            })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.message?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Submit */}
                                <Col xs={12}>
                                    <div className="d-grid d-md-flex justify-content-md-end">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="rounded-pill px-5 d-flex align-items-center justify-content-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                {/* Footer note */}
                <p className="text-center text-muted small mt-4 mb-0">
                    We usually respond within 24 hours.
                </p>
            </div>
        </div>
    );
}