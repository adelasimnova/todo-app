import axios from 'axios';
import { ToDo } from '../types/Todo';

const API_URL = 'https://mainapigateway-todos-api-ddb-dev-75916462.stacktape-app.com';

export async function getTodos(): Promise<ToDo[]> {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data.todos;
}

export async function createTodo(todoData: ToDo) {
  return axios.post(`${API_URL}/todos`, todoData);
}

export async function deleteTodo(id: string) {
  return axios.delete(`${API_URL}/todos/${id}`);
}

export async function updateTodo(id: string, todoData: Partial<ToDo>) {
  return axios.patch(`${API_URL}/todos/${id}`, todoData);
}
