import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../services/api";
import { getCurrentUser, isMovieFavorite, toggleFavorite } from "../services/auth";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [error, setError] = useState("");
  const user = getCurrentUser();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        setFavorite(isMovieFavorite(Number(id)));
      } catch (err) {
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleFavorite = () => {
    if (!user) {
      return alert("Please login to save favorites.");
    }
    const updated = toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
    setFavorite(updated.some((item) => item.id === movie.id));
  };

  if (loading) {
    return <div className="page-section loader">Loading details...</div>;
  }

  if (error) {
    return <div className="page-section alert-card alert-error">{error}</div>;
  }

  return (
    <div className="page-section detail-panel detail-page">
      <div className="detail-grid">
        <div className="poster-card">
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
        </div>
        <div className="detail-body">
          <p className="eyebrow">Movie Details</p>
          <h1>{movie.title}</h1>
          <p className="detail-meta">
            {movie.release_date} · {movie.runtime} min · {movie.vote_average?.toFixed(1)} / 10
          </p>
          <p className="section-copy">{movie.overview}</p>
          <div className="detail-tags">
            {movie.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <button className={`primary-btn ${favorite ? "favorite-active" : ""}`} onClick={handleFavorite}>
            {favorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
