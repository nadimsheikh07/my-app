import { useState } from "react"

type FormData = {
    name: string
    email: string
    mobile: string
    subject: string
    message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
    const [submitted, setSubmitted] = useState(false)

    const validate = (data: FormData): FormErrors => {
        const newErrors: FormErrors = {}

        if (!data.name.trim()) {
            newErrors.name = 'Name is required'
        } else if (data.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        if (!data.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Enter a valid email address'
        }

        if (!data.mobile.trim()) {
            newErrors.mobile = 'Mobile is required'
        } else if (!/^\d{10}$/.test(data.mobile.replace(/\D/g, ''))) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number'
        }

        if (!data.subject.trim()) {
            newErrors.subject = 'Subject is required'
        }

        if (!data.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (data.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        return newErrors
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        const updated = { ...formData, [name]: value }
        setFormData(updated)

        // Re-validate the changed field if it's already been touched or form was submitted
        if (touched[name as keyof FormData] || submitted) {
            const fieldErrors = validate(updated)
            setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormData] }))
        }
    }

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))

        const fieldErrors = validate(formData)
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormData] }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitted(true)

        const validationErrors = validate(formData)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            return
        }

        console.log("formData", formData)
        // Reset
        setFormData({ name: '', email: '', mobile: '', subject: '', message: '' })
        setErrors({})
        setTouched({})
        setSubmitted(false)
    }

    const showError = (field: keyof FormData) =>
        (touched[field] || submitted) && errors[field]

    return (
        <div>
            <h1>contact form</h1>

            <form onSubmit={onSubmit} noValidate>
                <div>
                    <label>Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {showError('name') && (
                        <span style={{ color: 'red' }}>{errors.name}</span>
                    )}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {showError('email') && (
                        <span style={{ color: 'red' }}>{errors.email}</span>
                    )}
                </div>

                <div>
                    <label>Mobile</label>
                    <input
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {showError('mobile') && (
                        <span style={{ color: 'red' }}>{errors.mobile}</span>
                    )}
                </div>

                <div>
                    <label>Subject</label>
                    <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {showError('subject') && (
                        <span style={{ color: 'red' }}>{errors.subject}</span>
                    )}
                </div>

                <div>
                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {showError('message') && (
                        <span style={{ color: 'red' }}>{errors.message}</span>
                    )}
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}