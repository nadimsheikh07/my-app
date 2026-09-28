import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";

export function AboutPage() {
    const [about, setAbout] = useState("");
    const [debouncedAbout, setDebouncedAbout] = useState("");
    // State to track the elapsed time
    const [seconds, setSeconds] = useState(0);
    // 1. Initial Mount & Unmount Cleanup
    useEffect(() => {
        console.log("Init");

        console.log("Timer started");
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        // Cleanup function (runs when component unmounts)
        return () => {
            clearTimeout(interval)
            console.log("AboutPage Unmounted - Cleaned up subscriptions/logs");
        };
    }, []);

    // 2. Catch the update and log it here
    useEffect(() => {
        console.log("Seconds updated to:", seconds);
    }, [seconds]); // Fires every time 'seconds' changes

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

            {/* Visual display for the active timer */}
            <div style={{ margin: "10px 0", padding: "5px", background: "#f0f0f0" }}>
                <strong>Time spent on page:</strong> {seconds} seconds
            </div>

            <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />

            <p>{about}</p>
        </div>
    );
}
