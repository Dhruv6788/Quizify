import React, { useState } from "react";
import Input from "../../components/Input";
import Submit from "../../components/Submit";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoad, setisLoad] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
    }
  }, []);

  const { values, errors, handleChange, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        const apiUrl = import.meta.env.VITE_LOGIN_URL;
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        };
        try {
          setisLoad(true);
          const response = await fetch(apiUrl, requestOptions);
          const data = await response.json();
          console.log(data);
          if (data.access) {
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            toast.success(
              <p className="font-[g-medium] capitalize">
                Logged In Successfully !!
              </p>
            );
            setTimeout(() => {
              navigate("/profile");
            }, 2500);
          } else {
            toast.error(
              <p className="font-[g-medium] capitalize">{data.detail}</p>
            );
          }
          setisLoad(false);
        } catch (error) {
          console.error("Error:", error);
        }
        action.resetForm();
      },
    });

  return (
    <>
      <div className="absolute w-screen h-screen">
        <div className="main w-full font-[g-medium] mt-10">
          <ToastContainer />
          <Header />
          <div className="greet mt-5">
            <p className="text-3xl tracking-wide text-center text-black font-[ppm-r] font-semibold">
              Sign In To Quizify
            </p>
          </div>
          <div className="form-wrapper lg:flex lg:justify-center">
            <div className="form-container mt-7 px-3 lg:w-[30vw]">
              <form onSubmit={handleSubmit} method="post">
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
                <div className="fp flex justify-end mt-2 font-[ppm-r]">
                  <Link to="/forgot" className="mr-1 text-black text-sm">
                    Forgot Password ?
                  </Link>
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
                <p className="capitalize text-black">
                  New to Quizify?{" "}
                  <Link
                    to="/signup"
                    className="underline capitalize text-black font-bold"
                  >
                    Join now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
