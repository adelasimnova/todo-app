import ReactDOM from "react-dom/client";
import { ToDoList } from "./todo-list/ToDoList";
import "./index.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { RegistrationForm } from "./registration-form/RegistrationForm";
import { LoginForm } from "./login-form/LoginForm";
import { AdminDashboard } from "./admin-dashboard/AdminDashboard";

function PrivateRoute() {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const isAuthenticated = accessToken && userId;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function AdminPrivateRoute() {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const isAdmin: boolean =
    localStorage.getItem("isAdmin") === "true" ? true : false;

  const isAuthenticated = !!accessToken && !!userId && isAdmin;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<ToDoList />} />
      </Route>

      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
