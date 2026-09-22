import React from "react";

interface PageHeadingProps {
    title: string;
    subHeading: string;
}

export default function PageHeading({ title, subHeading }: PageHeadingProps) {
    return (
        <React.Fragment>
            <h1>{title}</h1>
            <p>{subHeading}</p>
        </React.Fragment>
    )
}