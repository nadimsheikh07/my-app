import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const slides = [
    {
        image: "/images/slide-1.jpg",
        titleStart: "Build",
        titleHighlight: "Modern Web Apps",
        subtitle: "Fast, scalable, and beautifully designed with React.",
        cta: { label: "Get Started", to: "/signup" },
    },
    {
        image: "/images/slide-2.jpg",
        titleStart: "Ship",
        titleHighlight: "Faster with Confidence",
        subtitle: "Component-driven development that scales with your team.",
        cta: { label: "Learn More", to: "/services" },
    },
    {
        image: "/images/slide-3.jpg",
        titleStart: "Design That",
        titleHighlight: "Converts",
        subtitle: "Beautiful UI with Bootstrap and modern tooling.",
        cta: { label: "Contact Us", to: "/contact" },
    },
];

export default function HomeCarousel() {
    return (
        <Carousel fade interval={4000} controls indicators pause="hover">
            {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                    <div
                        style={{
                            position: "relative",
                            height: "clamp(320px, 55vh, 600px)",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={slide.image}
                            alt={`${slide.titleStart} ${slide.titleHighlight}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "brightness(0.55)",
                            }}
                        />
                    </div>

                    <Carousel.Caption
                        style={{
                            bottom: "15%",
                            left: 0,
                            right: 0,
                            textAlign: "left",
                        }}
                    >
                        <Container>
                            <h2
                                className="fw-bold text-white mb-3"
                                style={{
                                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
                                    lineHeight: 1.2,
                                }}
                            >
                                {slide.titleStart}{" "}
                                <span className="text-highlight">
                                    {slide.titleHighlight}
                                </span>
                            </h2>

                            <p
                                className="lead text-white-50 d-none d-md-block mb-4"
                                style={{ maxWidth: 600 }}
                            >
                                {slide.subtitle}
                            </p>

                            <Button
                                as={Link as any}
                                to={slide.cta.to}
                                variant="primary"
                                size="lg"
                                className="rounded-pill px-4"
                            >
                                {slide.cta.label}
                            </Button>
                        </Container>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}