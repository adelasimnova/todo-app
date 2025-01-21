import * as React from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export function LoginForm() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError("");
    setLoading(true);
    loginUser(email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setLoading(false);
          setError("Unauthorized");
        } else if (error.response.status === 404) {
          setLoading(false);
          setError("User not found");
        } else {
          setLoading(false);
          setError(error.message);
        }
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="heading">Login</h1>
      <div className="loader-wrapper">
        {loading && <box-icon name="loader" animation="spin" size="md" />}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="item-row">
          <label className="form-label" htmlFor="email-input">
            E-mail:
          </label>
          <input
            className="form-input"
            type="email"
            placeholder="Your e-mail"
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="item-row">
          <label className="form-label" htmlFor="password-input">
            Password:
          </label>

          <input
            className="form-input"
            type="password"
            placeholder="Your password"
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <p className="error-message">{error}</p>
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
