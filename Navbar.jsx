import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>🎬 MovieVerse</h2>

      <div>

        <Link to="/">Home</Link>

        <Link to="/favorites">Favorites</Link>

        <Link to="/login">Login</Link>

      </div>

    </nav>
  );
}

export default Navbar;