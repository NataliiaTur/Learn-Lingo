import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "@utils/bookingSchema.js";
import Modal from "@components/Modal/Modal.jsx";
import css from "./BookingModal.module.css";

function BookingModal({ isOpen, onClose, teacher }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bookingSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    alert(`Booking successful! We will contact you at ${data.email}`);

    reset();

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.content}>
        <h3 className={css.title}>Book trial lesson</h3>

        {/* Інформація про викладача */}
        <div className={css.teacherInfo}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={css.teacherAvatar}
          />
          <div>
            <p className={css.teacherLabel}>Your teacher</p>
            <p className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          {/* Full Name */}
          <div className={css.formGroup}>
            <label htmlFor="fullName" className={css.label}>
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Your Name"
              className={`${css.input} ${
                errors.fullName ? css.inputError : ""
              }`}
              {...register("fullName")}
            />
            {errors.fullName && (
              <span className={css.error}>{errors.fullName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.mail@example.com"
              className={`${css.input} ${errors.email ? css.inputError : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <span className={css.error}>{errors.email.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className={css.formGroup}>
            <label htmlFor="phoneNumber" className={css.label}>
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="+380123456789"
              className={`${css.input} ${
                errors.phoneNumber ? css.inputError : ""
              }`}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className={css.error}>{errors.phoneNumber.message}</span>
            )}
          </div>

          {/* Reason for Learning */}
          <div className={css.formGroup}>
            <p className={css.radioGroupLabel}>
              What is your main reason for learning English?
            </p>
            <div className={css.radioGroup}>
              <label className={css.radioLabel}>
                <input
                  type="radio"
                  value="career"
                  className={css.radio}
                  {...register("reason")}
                />
                <span>Career and business</span>
              </label>

              <label className={css.radioLabel}>
                <input
                  type="radio"
                  value="kids"
                  className={css.radio}
                  {...register("reason")}
                />
                <span>Lesson for kids</span>
              </label>

              <label className={css.radioLabel}>
                <input
                  type="radio"
                  value="abroad"
                  className={css.radio}
                  {...register("reason")}
                />
                <span>Living abroad</span>
              </label>

              <label className={css.radioLabel}>
                <input
                  type="radio"
                  value="exams"
                  className={css.radio}
                  {...register("reason")}
                />
                <span>Exams and coursework</span>
              </label>

              <label className={css.radioLabel}>
                <input
                  type="radio"
                  value="culture"
                  className={css.radio}
                  {...register("reason")}
                />
                <span>Culture, travel or hobby</span>
              </label>
            </div>
            {errors.reason && (
              <span className={css.error}>{errors.reason.message}</span>
            )}
          </div>

          <button type="submit" className={css.submitButton}>
            Book
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default BookingModal;
