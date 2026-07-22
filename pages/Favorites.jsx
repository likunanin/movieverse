import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../services/auth";
import { useAuth } from "../context/AuthContext";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(user ? getFavorites() : []);
  }, [user]);

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
