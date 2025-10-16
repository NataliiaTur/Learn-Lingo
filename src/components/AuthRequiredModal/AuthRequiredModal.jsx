import Modal from "@components/Modal/Modal.jsx";
import css from "./AuthRequiredModal.module.css";

function AuthRequiredModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.content}>
        <h3 className={css.title}>Authentication required</h3>
        <p className={css.text}>
          Please log in or register to add teachers to your favorites.
        </p>
        <button className={css.button} onClick={onClose}>
          OK
        </button>
      </div>
    </Modal>
  );
}

export default AuthRequiredModal;
