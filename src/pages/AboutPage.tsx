import React, { Component, type ChangeEvent } from "react";
import PageHeading from "../components/PageHeading";

// 1. Define types for Breadcrumb items matching your PageHeading signature
interface Breadcrumb {
    label: string;
    to?: string;
}

// 2. Define Props and State interfaces
interface AboutPageProps { }

interface AboutPageState {
    about: string;
}

export class AboutPage extends Component<AboutPageProps, AboutPageState> {
    // Explicitly type the class instance property for the timer
    private debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(props: AboutPageProps) {
        super(props);
        this.state = {
            about: ""
        };
    }

    // Initial Mount Lifecycle
    componentDidMount(): void {
        console.log("Init");
    }

    // Unmount Cleanup Lifecycle
    componentWillUnmount(): void {
        console.log("AboutPage Unmounted - Cleaned up subscriptions/logs");
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
    }

    // Explicitly type the change event argument
    private handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value;

        this.setState({ about: value }, () => {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            this.debounceTimeout = setTimeout(() => {
                if (this.state.about) {
                    console.log("about update (debounced):", this.state.about);
                }
            }, 500);
        });
    };

    render(): React.ReactNode {
        // Explicitly define the array type for breadcrumbs
        const breadcrumbs: Breadcrumb[] = [
            { label: "Home", to: "/" },
            { label: "About" },
        ];

        return (
            <div>
                <PageHeading breadcrumbs={breadcrumbs} />

                <input
                    type="text"
                    value={this.state.about}
                    onChange={this.handleInputChange}
                />

                <p>{this.state.about}</p>
            </div>
        );
    }
}
