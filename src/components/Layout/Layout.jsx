import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { logoutUser } from "../../services/authService.js";
import Modal from "../Modal/Modal.jsx";
import LoginForm from "../AuthForms/LoginForm.jsx";
import RegistrationForm from "../AuthForms/RegistrationsForms.jsx";
import css from "./Layout.module.css";

function Layout() {
  const { currentUser } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    console.log("🔄 Logout initiated..."); // Дебаг
    setIsLoggingOut(true);

    const result = await logoutUser();

    setIsLoggingOut(false);

    if (result.error) {
      console.error("❌ Logout failed:", result.error);
      alert(`Помилка виходу: ${result.error}`);
    } else {
      console.log("✅ Logout completed");
    }
  };

  const handleLoginSuccess = () => {
    console.log("✅ Успішний вхід!");
  };

  const handleRegisterSuccess = () => {
    console.log("✅ Успішна реєстрація!");
  };

  console.log("Current user in Layout:", currentUser);

  return (
    <div>
      <header className={css.header}>
        <nav className={css.nav}>
          <div className={css.logo}>
            <span>Learn Lingo</span>
          </div>

          <div className={css.links}>
            <Link to="/" className={css.link}>
              Home
            </Link>
            <Link to="/teachers" className={css.link}>
              Teachers
            </Link>
            {currentUser && (
              <Link to="/favorites" className={css.link}>
                Favorites
              </Link>
            )}
          </div>

          <div className={css.authButtons}>
            {currentUser ? (
              <>
                <span className={css.userName}>
                  {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className={css.logoutButton}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Вихід..." : "Вийти"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className={css.loginButton}
                >
                  Вхід
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className={css.registerButton}
                >
                  Реєстрація
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Модалка входу */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginForm
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </Modal>

      {/* Модалка реєстрації */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <RegistrationForm
          onClose={() => setIsRegisterModalOpen(false)}
          onSuccess={handleRegisterSuccess}
        />
      </Modal>
    </div>
  );
}

export default Layout;
