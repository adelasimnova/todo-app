import * as React from "react";
import "./ToDoList.css";
import { ToDoItem } from "../todo-item/ToDoItem";
import { ToDoForm } from "../todo-form/ToDoForm";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  logoutUser,
  deleteUser,
} from "../services/api";
import "boxicons";
import toast, { Toaster } from "react-hot-toast";
import { ToDo } from "../types/Todo";
import { useNavigate } from "react-router-dom";

export function ToDoList() {
  const [todos, setTodos] = React.useState<ToDo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    refetchToDos();
  }, []);

  function refetchToDos() {
    getTodos()
      .then((response: ToDo[]) => {
        setTodos(response);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function createToDo(toDoData: ToDo) {
    setError(null);
    setLoading(true);
    if (toDoData.title.length === 0) {
      setError("Please enter value!");
      setLoading(false);
      return;
    }
    if (toDoData.title.length >= 30) {
      setError("Text is too long!");
      setLoading(false);
      return;
    }
    createTodo(toDoData)
      .then(() => {
        refetchToDos();
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function deleteToDo(todoId: string) {
    setLoading(true);
    deleteTodo(todoId)
      .then(() => {
        refetchToDos();
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function updateToDo(
    todoId: string,
    toDoData: { done?: boolean; title?: string },
  ) {
    setLoading(true);
    updateTodo(todoId, toDoData)
      .then(() => {
        refetchToDos();
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function handleLogout() {
    setLoading(true);
    logoutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function handleDeleteUser() {
    setLoading(true);
    deleteUser()
      .then(() => {
        navigate("/registration");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  return (
    <div className="todo-list-container">
      <div className="action-button" onClick={handleLogout}>
        Logout
      </div>
      <div
        data-testid="delete-user-button"
        className="action-button"
        onClick={handleDeleteUser}
      >
        Close account
      </div>
      <div className="todo-list">
        <h1 className="heading">To Do List 🎯</h1>
        <div className="loader-wrapper">
          {loading && <box-icon name="loader" animation="spin" size="md" />}
        </div>
        <div>
          <ToDoForm onCreateTodo={createToDo} />
          <p className="error-message">{error}</p>
          <div className="cards-wrapper">
            {todos.map((item) => (
              <ToDoItem
                key={item.id}
                todo={item}
                onDeleteTodo={deleteToDo}
                onUpdateTodo={updateToDo}
              />
            ))}
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
