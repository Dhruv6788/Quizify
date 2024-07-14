import React from 'react'
import Input from '../../components/Input'
import Submit from '../../components/Submit'
import { useFormik } from 'formik'
import { signUpSchema } from '../../schemas'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

const initialValues = {
  name: "",
  email: "",
  password: ""
}

const SignUp = () => {
  const [isLoad, setisLoad] = useState(false)
  const { values,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      const apiUrl = import.meta.env.VITE_SIGNUP_API_URL;
      console.log(values)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: values.name, email: values.email, password: values.password, re_password: values.password }),
      };

      try {
        setisLoad(true)
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          toast.success(<p className='font-[g-medium] text-black capitalize'>We have sent the Confrimation email to verify your account.</p>)
        } else {
          toast.error(<p className='font-[g-medium] text-black capitalize'>{data.email}</p>)
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
    <div className='w-screen h-screen mt-0'>
      <div className="main w-full font-[ppr-r] bg-orage-400">
        <ToastContainer />
        <Header />
        <div className="greet mt-5">
          <p className='font-[g-medium] text-3xl tracking-wide text-center text-black'>Create New Account</p>
        </div>
        <div className="form-wrapper lg:flex lg:justify-center">
          <div className="form-container mt-7 px-3 lg:w-[30vw]">
            <form onSubmit={handleSubmit} method='post'>
              <div className="inputs">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  title="name"
                  placeholder="Name"
                  value={values.name}
                  onchange={handleChange}
                  onblur={handleBlur}
                  errors={errors.name}
                  istouched={touched.name}
                />
              </div>

              <div className="inputs mt-5">
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
                  type="text"
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

              <div className="inputs mt-10">
                <Submit
                  title="Create Account"
                  loading={isLoad}
                />
              </div>

            </form>
            <div className="flex justify-center mt-5 font-[ppm-r]">
              <p className='text-black'>Already have an account? <Link to="/login" className='underline capitalize text-black font-bold'>Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
export default SignUp