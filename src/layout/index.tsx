import type { ReactNode } from "react";
import WebHeader from "./header";
import WebFooter from "./footer";

interface WebLayoutProps {
    children: ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
    return (
        <>
            <WebHeader />
            {children}
            <WebFooter />
        </>
    )
}