import axios from 'axios';

const API_URL = 'https://mainapigateway-todos-api-ddb-dev-75916462.stacktape-app.com';

export async function getTodos() {
  return axios.get(`${API_URL}/todos`);
}

export async function createTodo(todoData) {
  return axios.post(`${API_URL}/todos`, todoData);
}

export async function deleteTodo(id) {
  return axios.delete(`${API_URL}/todos/${id}`);
}

export async function updateTodo(id, todoData) {
  return axios.patch(`${API_URL}/todos/${id}`, todoData);
}
