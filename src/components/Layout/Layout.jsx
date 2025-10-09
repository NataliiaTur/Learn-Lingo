import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
