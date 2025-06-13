import "./AdminDashboard.css";
import { TrashButton } from "./TrashButton";

const userMock = [
  { email: "adela@example.sk", createdAt: "14.9.2025" },
  { email: "katka@example.sk", createdAt: "14.3.2000" },
  { email: "matus@example.sk", createdAt: "14.3.2001" },
];

export function AdminDashboard() {
  function deleteUser(email: string) {
    console.log("Deleting user ...", email);
  }

  return (
    <table className="admin-table">
      <tr>
        <th className="admin-table-header">User email</th>
        <th className="admin-table-header">Created at</th>
        <th></th>
      </tr>
      {userMock.map((item) => (
        <tr>
          <td className="admin-table-data-cell">{item.email}</td>
          <td className="admin-table-data-cell">{item.createdAt}</td>
          <td>
            <TrashButton onClick={deleteUser} email={item.email} />
          </td>
        </tr>
      ))}
    </table>
  );
}
