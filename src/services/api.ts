import axios from "axios";
import { ToDo } from "../types/Todo";

// const API_URL_OLD = 'https://mainapigateway-todos-api-ddb-dev-75916462.stacktape-app.com';
const API_URL =
  "https://mainapigateway-todo-app-backend-mysql-production-80edfbed.stacktape-app.com";

export async function getTodos(): Promise<ToDo[]> {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(`${API_URL}/todos`, {
    headers: { Authorization: "bearer " + accessToken },
  });
  return response.data.todos;
}

export async function createTodo(todoData: ToDo) {
  const accessToken = localStorage.getItem("accessToken");
  return axios.post(`${API_URL}/todos`, todoData, {
    headers: { Authorization: "bearer " + accessToken },
  });
}

export async function deleteTodo(id: string) {
  const accessToken = localStorage.getItem("accessToken");
  return axios.delete(`${API_URL}/todos/${id}`, {
    headers: { Authorization: "bearer " + accessToken },
  });
}

export async function updateTodo(id: string, todoData: Partial<ToDo>) {
  const accessToken = localStorage.getItem("accessToken");
  return axios.patch(`${API_URL}/todos/${id}`, todoData, {
    headers: { Authorization: "bearer " + accessToken },
  });
}

export async function registerUser(email: string, password: string) {
  return axios.post(`${API_URL}/users`, {
    email: email,
    password: password,
  });
}

export async function loginUser(email: string, password: string) {
  const response = await axios.post(`${API_URL}/tokens`, {
    email: email,
    password: password,
  });

  localStorage.setItem("userId", response.data.userId);
  localStorage.setItem("accessToken", response.data.accessToken);

  console.log(response);
}
