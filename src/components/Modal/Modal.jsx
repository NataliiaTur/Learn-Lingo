import { useEffect } from "react";
import css from "./Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    // Закриття на Escape
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Блокуємо скрол body
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Закриття на backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className={css.closeIcon} width="32" height="32">
            <use href="/src/assets/icons/icons.svg#icon-x"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
