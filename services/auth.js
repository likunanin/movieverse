const SESSION_KEY = "movieverse-session";
const AUTH_EVENT = "movieverse-auth-change";
const TOKEN_KEY = "movieverse-token";

const emitAuthChange = () => window.dispatchEvent(new Event(AUTH_EVENT));

const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
const setStoredToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearStoredToken = () => localStorage.removeItem(TOKEN_KEY);

const getSessionUser = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const saveSession = (user, token) => {
  console.log("DEBUG saveSession before write", SESSION_KEY, user, token);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  console.log("DEBUG saveSession after write", SESSION_KEY, localStorage.getItem(SESSION_KEY));
  if (token) {
    setStoredToken(token);
  }
  emitAuthChange();
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  clearStoredToken();
  emitAuthChange();
};

export const getCurrentUser = () => getSessionUser();

export const getAuthHeaders = () => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const logoutUser = async () => {
  clearSession();
  return { success: true };
};

const getFavoriteKey = (email) => `movieverse-favorites-${email}`;

export const getFavorites = () => {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(getFavoriteKey(user.email)) || "[]");
};

export const isMovieFavorite = (movieId) => {
  const favorites = getFavorites();
  return favorites.some((item) => item.id === movieId);
};

export const toggleFavorite = (movie) => {
  const user = getCurrentUser();
  if (!user) return [];
  const key = getFavoriteKey(user.email);
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === movie.id);
  const updatedFavorites = exists
    ? favorites.filter((item) => item.id !== movie.id)
    : [...favorites, movie];
  localStorage.setItem(key, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};
