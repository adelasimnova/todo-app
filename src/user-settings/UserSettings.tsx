import "./UserSettings.css";
import { logoutUser, deleteUser } from "../services/api";
import "boxicons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function UserSettings() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handleDeleteUser() {
    deleteUser()
      .then(() => {
        navigate("/registration");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div className="user-settings">
      <p className="user-email">{localStorage.getItem("email")}</p>
      <div>
        <div className="action-button" onClick={handleLogout}>
          Logout
        </div>
        <div
          className="action-button-delete"
          data-testid="delete-user-button"
          onClick={handleDeleteUser}
        >
          Close account
        </div>
      </div>
    </div>
  );
}
