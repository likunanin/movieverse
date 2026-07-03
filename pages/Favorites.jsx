import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getCurrentUser, getFavorites } from "../services/auth";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setFavorites(getFavorites());
    const handleAuthChange = () => {
      setUser(getCurrentUser());
      setFavorites(getFavorites());
    };
    window.addEventListener("movieverse-auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("movieverse-auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const refreshFavorites = () => setFavorites(getFavorites());

  if (!user) {
    return (
      <div className="page-section">
        <div className="alert-card alert-error">
          You need to login to view favorite movies.
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <section className="banner">
        <div>
          <p className="eyebrow">My Favorites</p>
          <h1 className="section-heading">Saved movies</h1>
          <p className="section-copy">A quick list of the films you've marked as favorites.</p>
        </div>
      </section>

      {favorites.length === 0 ? (
        <div className="empty-state">No favorite movies yet. Add some from the home page.</div>
      ) : (
        <div className="card-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onFavoriteChange={refreshFavorites} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
