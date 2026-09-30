import AboutText from "../components/AboutText";
import PageHeading from "../components/PageHeading";

export function ServicesPage() {
    return (
        <div>
            <PageHeading breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "Service" }, // last item — no `to`
            ]} />

            <AboutText  />
        </div>
    )
}