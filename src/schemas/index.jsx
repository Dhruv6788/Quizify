import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password")
})

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(50).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password")
})

export const emailSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email")
})

export const resetPasswordSchema = Yup.object({
    password: Yup.string().min(8).required("Please enter your password"),
    rePassword: Yup.string().required("Please confrim your password").oneOf([Yup.ref('password'), null], "Password must match")
})
