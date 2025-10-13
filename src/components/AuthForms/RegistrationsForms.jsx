import css from "./RegistrationsForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registrationSchema } from "../../utils/validationSchemas.js";
import { registerUser } from "../../services/authService.js";

function RegistrationForm({ onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");

    const result = await registerUser(data.email, data.password, data.name);

    setIsLoading(false);

    if (result.error) {
      setAuthError(result.error);
    } else {
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Registration</h2>
      <p className={css.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {/* Поле імені */}
        <div className={css.formGroup}>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className={`${css.input} ${errors.name ? css.inputError : ""}`}
          />
          {errors.name && (
            <span className={css.errorMessage}>{errors.name.message}</span>
          )}
        </div>

        {/* Поле email */}
        <div className={css.formGroup}>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
          />
          {errors.email && (
            <span className={css.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        {/* Поле пароля */}
        <div className={css.formGroup}>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
          />
          {errors.password && (
            <span className={css.errorMessage}>{errors.password.message}</span>
          )}
        </div>

        {/* Помилка авторизації */}
        {authError && <div className={css.authError}>{authError}</div>}

        {/* Кнопка відправки */}
        <button type="submit" className={css.submitButton} disabled={isLoading}>
          {isLoading ? "Sign Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
