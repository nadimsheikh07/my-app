import PageHeading from "../components/PageHeading";

export function AboutPage() {
    return (
        <div>
            <PageHeading breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "About" }, // last item — no `to`
            ]} />
        </div>
    )
}