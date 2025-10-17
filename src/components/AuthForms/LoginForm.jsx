import css from "./LoginForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@utils/validationSchemas.js";
import { loginUser } from "@services/authService.js";

function LoginForm({ onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");

    const result = await loginUser(data.email, data.password);

    setIsLoading(false);

    if (result.error) {
      setAuthError(result.error);
    } else {
      // Успішний вхід
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
        <div className={css.formGroup} style={{ position: "relative" }}>
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
          />
          <button
            type="button"
            className={css.eyeButton}
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            <svg className={css.eyeIcon} width="20" height="20">
              <use
                href={`/public/icons.svg#${
                  isPasswordVisible ? "icon-eye-off" : "icon-eye"
                }`}
              ></use>
            </svg>
          </button>

          {errors.password && (
            <span className={css.errorMessage}>{errors.password.message}</span>
          )}
        </div>

        {/* Помилка авторизації */}
        {authError && <div className={css.authError}>{authError}</div>}

        {/* Кнопка відправки */}
        <button type="submit" className={css.submitButton} disabled={isLoading}>
          {isLoading ? "Log In..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
