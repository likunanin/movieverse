const USERS_KEY = "movieverse-users";
const SESSION_KEY = "movieverse-session";

const emitAuthChange = () => window.dispatchEvent(new Event("movieverse-auth-change"));
const readUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getCurrentUser = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const loginUser = ({ email, password }) => {
  const users = readUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { success: false, message: "No account found with that email." };
  }
  if (user.password !== password) {
    return { success: false, message: "Password is incorrect." };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
  emitAuthChange();
  return { success: true, user };
};

export const registerUser = ({ name, email, password }) => {
  const users = readUsers();
  if (users.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: "Email is already registered." };
  }
  const newUser = { name, email: email.toLowerCase(), password };
  users.push(newUser);
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name: newUser.name, email: newUser.email }));
  emitAuthChange();
  return { success: true, user: newUser };
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
  emitAuthChange();
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
