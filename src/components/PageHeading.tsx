import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface PageHeadingProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function PageHeading({
    breadcrumbs = [],
}: PageHeadingProps) {
    return (
        <div className="page-heading mb-4">
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return isLast || !item.to ? (
                            <Breadcrumb.Item key={index} active>
                                {item.label}
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item
                                key={index}
                                linkAs={Link}
                                linkProps={{ to: item.to }}
                            >
                                {item.label}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            )}
        </div>
    );
}