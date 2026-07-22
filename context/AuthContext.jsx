import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { clearSession, getCurrentUser, saveSession } from "../services/auth";

const AuthContext = createContext(null);
const AUTH_API_URL = "https://academyofdigitalindustriesbackend.onrender.com/api/v1/auth";

const parseTokenUser = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const raw = atob(payload);
    const data = JSON.parse(raw);
    return {
      id: data.userID || data.userId || null,
      name: data.userName || data.user || null,
      email: data.email || null,
    };
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = () => {
      setUser(getCurrentUser());
      setLoading(false);
    };

    initialize();

    const syncAuth = () => setUser(getCurrentUser());
    window.addEventListener("movieverse-auth-change", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("movieverse-auth-change", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const saveAuth = (token) => {
    const parsedUser = parseTokenUser(token);
    if (!parsedUser) {
      throw new Error("Failed to parse auth token.");
    }
    saveSession(parsedUser, token);
    setUser(parsedUser);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        email,
        password,
      });
      const data = response.data;
      if (!data?.token) {
        return { success: false, message: data?.msg || "Login failed." };
      }
      saveAuth(data.token);
      return { success: true, user: getCurrentUser() };
    } catch (error) {
      const apiMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Unable to reach the authentication server.";
      return { success: false, message: apiMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userName, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${AUTH_API_URL}/register`, {
        userName,
        email,
        password,
      });
      const data = response.data;
      if (!data?.token) {
        return { success: false, message: data?.msg || "Registration failed." };
      }
      saveAuth(data.token);
      return { success: true, user: getCurrentUser() };
    } catch (error) {
      const apiMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Unable to reach the authentication server.";
      return { success: false, message: apiMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      clearSession();
      setUser(null);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
