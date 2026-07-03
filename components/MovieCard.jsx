import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, isMovieFavorite, toggleFavorite } from "../services/auth";
import { getImageUrl } from "../services/api";

function MovieCard({ movie, onFavoriteChange }) {
  const [favorite, setFavorite] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    if (movie) {
      setFavorite(isMovieFavorite(movie.id));
    }
  }, [movie]);

  const handleFavorite = () => {
    if (!user) {
      return alert("Please login to save favorites.");
    }

    toggleFavorite({
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
    setFavorite((state) => !state);
    onFavoriteChange?.();
  };

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <img src={getImageUrl(movie.poster_path)} alt={movie.title || movie.name} />
      </Link>
      <div className="movie-card-body">
        <div>
          <h3>{movie.title || movie.name}</h3>
          <p className="movie-meta">
            {movie.release_date?.slice(0, 4) || "TBA"} · {movie.vote_average?.toFixed(1) || "-"}
          </p>
        </div>
        <button className={`favorite-btn ${favorite ? "favorite-active" : ""}`} onClick={handleFavorite}>
          {favorite ? "★" : "☆"}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
