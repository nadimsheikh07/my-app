import HomeCarousel from "../components/carouseles/HomeCarousel";
import PageHeading from "../components/PageHeading";

export function HomePage() {
    return (
        <div>
            <PageHeading breadcrumbs={[
                { label: "Home" }, // last item — no `to`
            ]} />

            <HomeCarousel />
        </div>
    )
}