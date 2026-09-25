import type { ReactNode } from "react";
import { Container } from "react-bootstrap";
import WebHeader from "./header";
import WebFooter from "./footer";

interface WebLayoutProps {
    children: ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <WebHeader />
            <Container as="main" fluid className="flex-grow-1 py-4">
                {children}
            </Container>
            <WebFooter />
        </div>
    );
}