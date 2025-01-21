import ReactDOM from "react-dom/client";
import { ToDoList } from "./to-do-list/ToDoList";
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

function PrivateRoute() {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const isAuthenticated = accessToken && userId;

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
    </Routes>
  </BrowserRouter>,
);
