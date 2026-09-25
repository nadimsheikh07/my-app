import ContactForm from "../components/forms/ContactForm";
import PageHeading from "../components/PageHeading";

export function ContactPage() {
    return (
        <div>
            <PageHeading breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "Contact" }, // last item — no `to`
            ]} />

            <ContactForm />
        </div>
    )
}