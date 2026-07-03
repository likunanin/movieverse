import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { fetchPopularMovies, searchMovies } from "../services/api";
import { getCurrentUser } from "../services/auth";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleAuthChange = () => setUser(getCurrentUser());
    window.addEventListener("movieverse-auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("movieverse-auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const loadMovies = async (searchTerm) => {
    try {
      setLoading(true);
      setError("");
      const data = await searchMovies(searchTerm);
      setMovies(data);
    } catch (err) {
      setError("Could not load movies. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies("");
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    loadMovies(query.trim());
  };

  return (
    <div className="page-section">
      <section className="banner">
        <div>
          <p className="eyebrow">Trending Now</p>
          <h1 className="section-heading">Discover your next favorite movie.</h1>
          <p className="section-copy">
            Browse popular titles, explore details, and save favorites with a dark UI built for movie lovers.
          </p>
        </div>
        <SearchBar query={query} onChange={setQuery} onSubmit={handleSearch} />
      </section>

      {user ? null : (
        <div className="alert-card">
          Login to save favorites and track your watchlist.
        </div>
      )}

      {error && <div className="alert-card alert-error">{error}</div>}
      {loading ? (
        <div className="loader">Loading movies…</div>
      ) : (
        <div className="card-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div className="empty-state">No movies found. Try a different search.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
