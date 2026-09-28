import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";

export function AboutPage() {
    const [about, setAbout] = useState("");
    const [debouncedAbout, setDebouncedAbout] = useState("");

    // 1. Initial Mount & Unmount Cleanup
    useEffect(() => {
        console.log("Init");

        // Cleanup function (runs when component unmounts)
        return () => {
            console.log("AboutPage Unmounted - Cleaned up subscriptions/logs");
        };
    }, []);

    // 2. Debounce Logic: Updates 'debouncedAbout' state after a delay
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedAbout(about);
        }, 500); // 500ms delay

        // Clears the timeout if the user types again within 500ms
        return () => {
            clearTimeout(handler);
        };
    }, [about]);

    // 3. Update Log: Fires only when the debounced state changes
    useEffect(() => {
        if (debouncedAbout) {
            console.log("about update (debounced):", debouncedAbout);
        }
    }, [debouncedAbout]);

    return (
        <div>
            <PageHeading breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "About" },
            ]} />

            <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />

            <p>{about}</p>
        </div>
    );
}
