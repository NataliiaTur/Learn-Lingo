import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/, "Name should contain only letters"),

  email: yup.string().required().email("Invalid email format"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number format"
    ),

  reason: yup
    .string()
    .required("Please select a reason for learning")
    .oneOf(
      ["career", "kids", "abroad", "exams", "culture", "travel"],
      "Invalid reason selected"
    ),
});
