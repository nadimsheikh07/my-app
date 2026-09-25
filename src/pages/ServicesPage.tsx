import PageHeading from "../components/PageHeading";

export function ServicesPage() {
    return (
        <div>
            <PageHeading breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "Service" }, // last item — no `to`
            ]} />
        </div>
    )
}