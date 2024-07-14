import React, { useState } from 'react'
import Input from '../../components/Input'
import Submit from '../../components/Submit'
import { useFormik } from 'formik'
import { emailSchema } from '../../schemas'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

const initialValues = {
    email: ""
}

const Forgot = () => {
    const navigate = useNavigate();
    const [isLoad, setisLoad] = useState(false)
    const { values,
        errors,
        handleChange,
        touched,
        handleBlur,
        handleSubmit
    } = useFormik({
        initialValues: initialValues,
        validationSchema: emailSchema,
        onSubmit: async (values, action) => {
            const apiUrl = import.meta.env.VITE_RESET_PASSWORD_EMAIL;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email })
            };
            try {
                setisLoad(true)
                const response = await fetch(apiUrl, requestOptions);
                if (response.status === 204) {
                    toast.success(<p className='font-[g-medium]'>We have sent the confrimation email on {values.email}</p>)
                } else {
                    toast.error(<p className='font-[g-medium] capitalize'>Something Went Wrong !!</p>)
                }
                setisLoad(false)
            } catch (error) {
                console.error('Error:', error);
            }
            action.resetForm()
        }
    })

    return (
        <>
            <div className="main w-full font-[g-medium]">
                <ToastContainer />
                <Header />
                <div className="greet mt-5">
                    <p className='font-[ppm-r] text-3xl tracking-wide text-center text-black'>Trouble logging in?</p>
                    <p className='text-sm px-7 text-center font-[ppm-r] mt-2 text-gray-500'>Enter your email and we'll send you a link to get back into your account.</p>
                </div>
                <div className="form-wrapper lg:flex lg:justify-center">
                    <div className="form-container mt-7 px-3 lg:w-[30vw]">
                        <form onSubmit={handleSubmit} method='post'>
                            <div className="inputs">
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    title="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onchange={handleChange}
                                    onblur={handleBlur}
                                    errors={errors.email}
                                    istouched={touched.email}
                                />
                            </div>
                            <div className="inputs mt-4">
                                <Submit
                                    title="Send Email"
                                    loading={isLoad}
                                    onclick={handleSubmit}
                                />
                            </div>
                        </form>
                        <div className="flex justify-center mt-5">
                            <p className='capitalize font-[ppm-r] text-black'>Back to login? <Link to="/login" className='underline capitalize text-black font-bold'>log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot