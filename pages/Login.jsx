import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = loginUser({ email, password });
    if (!result.success) {
      setMessage(result.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="page-section">
      <div className="form-panel auth-panel">
        <h1>Login</h1>
        <p className="section-copy">Enter your email and password to continue.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {message && <div className="alert-card alert-error">{message}</div>}
          <button className="primary-btn" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
