import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "YOUR_TMDB_API_KEY";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchPopularMovies = async () => {
  const response = await api.get("/trending/movie/week", {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
    },
  });
  return response.data.results;
};

export const searchMovies = async (query) => {
  if (!query) {
    return fetchPopularMovies();
  }
  const response = await api.get("/search/movie", {
    params: {
      api_key: TMDB_API_KEY,
      query,
      language: "en-US",
      include_adult: false,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movie/${id}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
      append_to_response: "videos,credits",
    },
  });
  return response.data;
};

export const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `https://image.tmdb.org/t/p/w500${path}`;
};
