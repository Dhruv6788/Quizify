import React, { useState } from 'react'
import Input from '../components/Input'
import Submit from '../components/Submit'
import { useFormik } from 'formik'
import { loginSchema } from '../schemas'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from '../components/Header'


const initialValues = {
    email: "",
    password: ""
}

const LoginForm = () => {
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
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {
            const apiUrl = "http://192.168.56.1:8000/api/auth/jwt/create/";
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email, password: values.password }),
            };
            try {
                setisLoad(true)
                const response = await fetch(apiUrl, requestOptions);
                const data = await response.json();
                console.log(data);
                if (data.access) {
                    localStorage.setItem('accessToken', data.access)
                    localStorage.setItem('refreshToken', data.refresh)
                    toast.success(<p className='font-[g-medium] capitalize'>Logged In Successfully !!</p>)
                    setTimeout(() => {
                        navigate("/home")
                    }, 2500);
                } else {
                    toast.error(<p className='font-[g-medium] capitalize'>{data.detail}</p>)
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
            <div className="main bg-[black] w-full font-[g-medium]">
                <ToastContainer />
                <Header/>
                <div className="greet mt-5">
                    <p className='font-[g-medium] text-3xl tracking-wide text-center text-[#8be78b9c]'>Sign In To Quizify</p>
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
                           
                            <div className="inputs mt-5">
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    title="Password"
                                    placeholder="Password"
                                    value={values.password}
                                    onchange={handleChange}
                                    onblur={handleBlur}
                                    errors={errors.password}
                                    istouched={touched.password}
                                />
                            </div>
                            <div className="fp flex justify-end mt-2 font-[g-light]">
                                <Link to="/forgot" className='mr-1 text-[#ffffff83] text-sm'>Forgot Password ?</Link>
                            </div>
                            <div className="inputs mt-7">
                                <Submit
                                    title="Sign In"
                                    loading={isLoad}
                                    onclick={handleSubmit}
                                />
                            </div>
                        </form>

                        <div className="flex justify-center mt-5 text-[#ffffffc6]">
                            <p className='capitalize text-[#ffffff83]'>New to Quizify? <Link to="/signup" className='underline capitalize text-[#99dd999d]'>Join now</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm