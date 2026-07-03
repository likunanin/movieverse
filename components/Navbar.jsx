import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/auth";

function Navbar() {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const refreshUser = () => setUser(getCurrentUser());
    window.addEventListener("storage", refreshUser);
    window.addEventListener("movieverse-auth-change", refreshUser);
    return () => {
      window.removeEventListener("storage", refreshUser);
      window.removeEventListener("movieverse-auth-change", refreshUser);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <span>🎬</span> MovieVerse
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <button className="btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
