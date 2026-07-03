import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = registerUser({ name, email, password });
    if (!result.success) {
      setMessage(result.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="page-section">
      <div className="form-panel auth-panel">
        <h1>Create account</h1>
        <p className="section-copy">Sign up to save favorites and browse personalization.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {message && <div className="alert-card alert-error">{message}</div>}
          <button className="primary-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
