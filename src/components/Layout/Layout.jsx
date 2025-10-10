import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

function Layout() {
  const { currentUser } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>

        {/* показуємо статус авторизації */}
        <div>
          {currentUser ? (
            <span>Hello, {currentUser.displayName || currentUser.email}!</span>
          ) : (
            <span>Не авторизований</span>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
