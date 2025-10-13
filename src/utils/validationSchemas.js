import * as yup from "yup";

export const registrationSchema = yup.object({
  name: yup
    .string()
    .required("The name is required")
    .min(2, "The name must consist 2 least min")
    .max(30, "The name must consist 30 least max"),
  email: yup
    .string()
    .required("The email is required")
    .email("This email isn`t correct"),
  password: yup
    .string()
    .required("The password is required")
    .min(6, "The password must consist 6 symbols min")
    .max(50, "The mail is too long"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("The email is required")
    .email("This email isn`t correct"),
  password: yup
    .string()
    .required("The password is required")
    .min(6, "The password must consist 6 symbols min"),
});
