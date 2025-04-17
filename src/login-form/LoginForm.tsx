import * as React from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";

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
          setError("Oops! Wrong email or password. Give it another shot.");
        } else if (error.response.status === 404) {
          setLoading(false);
          setError("Hmm, no user found. Could it be a typo?");
        } else {
          setLoading(false);
          setError(error.message);
        }
      });
  };

  return (
    <div className="form-wrapper">
      <div className="heading-wrapper">
        <h1 className="heading">To Do List</h1>
        <div className="form-label">Login</div>
      </div>
      <div className="loader-wrapper">
        {loading && <box-icon name="loader" animation="spin" size="md" />}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="item-row">
          <label className="form-label" htmlFor="login-email-input">
            E-mail:
          </label>
          <input
            data-testid="login-email-input"
            className="form-input"
            type="email"
            placeholder="Your e-mail"
            id="login-email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
          />
        </div>
        <div className="item-row">
          <label className="form-label" htmlFor="login-password-input">
            Password:
          </label>

          <input
            data-testid="login-password-input"
            className="form-input"
            type="password"
            placeholder="Your password"
            id="login-password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <p className="error-message">{error}</p>
        <button
          data-testid="login-submit-button"
          className="form-button"
          type="submit"
        >
          Submit
        </button>
        <div className="registration-link">
          Don't have an account?{" "}
          <Link to="/registration" data-testid="registration-link">
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
}
