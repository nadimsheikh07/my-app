import ContactForm from "../components/forms/ContactForm";
import PageHeading from "../components/PageHeading";

export function ContactPage() {
    return (
        <div>
            <PageHeading title="Contact" subHeading="Contact page" />

            <ContactForm />
        </div>
    )
}