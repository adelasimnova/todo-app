import * as React from "react";
import "./RegistrationForm.css";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export function RegistrationForm() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError("");
    setLoading(true);
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      setError("Passwords do NOT match");
      setLoading(false);
      return;
    }
    registerUser(email, password)
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="heading">Registration</h1>
      <div className="loader-wrapper">
        {loading && <box-icon name="loader" animation="spin" size="md" />}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item-row">
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
        <div className="item-row">
          <label className="form-label" htmlFor="confirm-password-input">
            Confirm password:
          </label>

          <input
            className="form-input"
            type="password"
            placeholder="Confirm your password"
            id="confirm-password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
