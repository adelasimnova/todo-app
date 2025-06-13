import React from "react";
import { User } from "../types/User";
import "./AdminDashboard.css";
import { TrashButton } from "./TrashButton";
import { deleteUserByAdmin, getUsers, updateUser } from "../services/api";
import toast from "react-hot-toast";
import { UserSettings } from "../user-settings/UserSettings";

export function AdminDashboard() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    refetchUsers();
    setLoading(true);
  }, []);

  function refetchUsers() {
    getUsers()
      .then((response: User[]) => {
        setUsers(response);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function deleteUser(id: string) {
    setLoading(true);
    deleteUserByAdmin(id)
      .then(() => {
        refetchUsers();
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function selectRole(id: string, role: "admin" | "user") {
    setLoading(true);
    const isAdmin = role === "admin" ? true : false;
    updateUser(id, { isAdmin })
      .then(() => {
        refetchUsers();
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  return (
    <div>
      <UserSettings />
      <table className="admin-table">
        <tr>
          <th className="admin-table-header">User email</th>
          <th className="admin-table-header">Created at</th>
          <th className="admin-table-header">Role</th>
          <th></th>
        </tr>
        <div className="loader-wrapper">
          {loading && <box-icon name="loader" animation="spin" size="md" />}
        </div>
        {users.map((item) => (
          <tr>
            <td className="admin-table-data-cell">{item.email}</td>
            <td className="admin-table-data-cell">
              {new Date(item.createdAt).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </td>
            <td className="admin-table-data-cell">
              <select
                value={item.isAdmin ? "admin" : "user"}
                onChange={(e) => selectRole(item.id, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
            <td>
              <TrashButton
                onClick={deleteUser}
                disabled={item.isAdmin}
                id={item.id}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
