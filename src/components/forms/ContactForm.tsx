import { useForm, type SubmitHandler } from "react-hook-form"

type FormData = {
    name: string
    email: string
    mobile: string
    subject: string
    message: string
}

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        mode: 'onTouched', // validate on blur, then re-validate on change
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            subject: '',
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("formData", data)
        // simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        reset()
    }

    return (
        <div>
            <h1>contact form</h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label>Name</label>
                    <input
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        })}
                    />
                    {errors.name && (
                        <span style={{ color: 'red' }}>{errors.name.message}</span>
                    )}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address'
                            }
                        })}
                    />
                    {errors.email && (
                        <span style={{ color: 'red' }}>{errors.email.message}</span>
                    )}
                </div>

                <div>
                    <label>Mobile</label>
                    <input
                        type="tel"
                        {...register('mobile', {
                            required: 'Mobile is required',
                            validate: (value) =>
                                /^\d{10}$/.test(value.replace(/\D/g, '')) ||
                                'Enter a valid 10-digit mobile number'
                        })}
                    />
                    {errors.mobile && (
                        <span style={{ color: 'red' }}>{errors.mobile.message}</span>
                    )}
                </div>

                <div>
                    <label>Subject</label>
                    <input
                        {...register('subject')}
                    />
                    {errors.subject && (
                        <span style={{ color: 'red' }}>{errors.subject.message}</span>
                    )}
                </div>

                <div>
                    <label>Message</label>
                    <textarea
                        {...register('message', {
                            required: 'Message is required',
                            minLength: {
                                value: 10,
                                message: 'Message must be at least 10 characters'
                            }
                        })}
                    />
                    {errors.message && (
                        <span style={{ color: 'red' }}>{errors.message.message}</span>
                    )}
                </div>

                <div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}