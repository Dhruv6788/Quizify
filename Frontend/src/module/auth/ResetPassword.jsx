import React, { useState } from "react";
import Input from "../../components/Input";
import Submit from "../../components/Submit";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../schemas";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const initialValues = {
  password: "",
  rePassword: "",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoad, setisLoad] = useState(false);
  const { uid, token } = useParams();

  const { values, errors, handleChange, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: async (values, action) => {
        const apiUrl = import.meta.env.VITE_RESET_PASSWORD_CONFRIM;
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: uid,
            token: token,
            new_password: values.password,
            re_new_password: values.rePassword,
          }),
        };
        console.log(requestOptions);
        try {
          setisLoad(true);
          const response = await fetch(apiUrl, requestOptions);
          console.log(response);
          if (!response.ok) {
            toast.error(
              <p className="font-[ppm-r] capitalize">Something Went Wrong!!</p>
            );
            navigate("/fotgot");
          } else {
            toast.success(
              <p className="font-[ppm-r] capitalize">
                Password changed Successfully!!
              </p>
            );
            navigate("/login");
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
      <div className="main w-full font-[ppm-r]">
        <ToastContainer />
        <Header />
        <div className="greet mt-5">
          <p className="font-[ppm-r] text-3xl tracking-wide text-center text-black">
            Reset Password
          </p>
        </div>
        <div className="form-wrapper lg:flex lg:justify-center">
          <div className="form-container mt-7 px-3 lg:w-[30vw]">
            <form onSubmit={handleSubmit} method="post">
              <div className="inputs">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  title="New Password"
                  placeholder="New Password"
                  value={values.password}
                  onchange={handleChange}
                  onblur={handleBlur}
                  errors={errors.password}
                  istouched={touched.password}
                />
              </div>
              <div className="inputs mt-5">
                <Input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  title="Confrim Password"
                  placeholder="Confrim Password"
                  value={values.rePassword}
                  onchange={handleChange}
                  onblur={handleBlur}
                  errors={errors.rePassword}
                  istouched={touched.rePassword}
                />
              </div>
              <div className="inputs mt-4">
                <Submit
                  title="Reset Password"
                  loading={isLoad}
                  onclick={handleSubmit}
                />
              </div>
            </form>
            <div className="flex justify-center mt-5">
              <p className="capitalize text-black">
                New to Quizify?{" "}
                <a
                  href="/forgot"
                  className="underline capitalize text-black font-bold"
                >
                  Join now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
