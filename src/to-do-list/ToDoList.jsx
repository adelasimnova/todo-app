import * as React from 'react';
import './ToDoList.css';
import { Card } from '../card/Card';
import { ToDoForm } from '../to-do-form/ToDoForm';
import {
  getTodos, createTodo, deleteTodo, updateTodo,
} from '../services/api';
import 'boxicons';
import toast, { Toaster } from 'react-hot-toast';


export function ToDoList() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true); 
    refetchToDos();
  }, []);

  function refetchToDos() {
    getTodos().then((response) => {
      setTodos(response.data.todos);
      setLoading(false);
    })
    .catch((error) => {
      toast.error(error.message);
      setLoading(false);
    });
  }

  function createToDo(toDoData) {
    setError(null);
    setLoading(true);
    if (toDoData.title.length === 0) {
      setError('Please enter value!');
      setLoading(false);
      return;
    }
    if (toDoData.title.length >= 30) {
      setError('Text is too long!');
      setLoading(false);
      return;
    }
    createTodo(toDoData).then(() => {
      refetchToDos();
    })
    .catch((error) => {
      toast.error(error.message);
      setLoading(false);
    });
  }

  function deleteToDo(todoId) {
    setLoading(true);
    deleteTodo(todoId).then(() => {
      refetchToDos();
    })
    .catch((error) => {
      toast.error(error.message);
      setLoading(false);
    })
  }

  function updateToDo(todoId, toDoData) {
    setLoading(true);
    updateTodo(todoId, toDoData).then(() => {
      refetchToDos();
    })
    .catch((error) => {
      toast.error(error.message);
      setLoading(false);
    })
  }

  return (
    <div className="card-list">
      <h1 className="todo-heading">My To Do List 🎯</h1>
      <div className="loader-wrapper">
        {loading && <box-icon name="loader" animation="spin" size="md" /> }
      </div>
     <ToDoForm onCreateTodo={createToDo} />
       <p className="error-message">
        {error}
      </p> 
       <div className="cards-wrapper">
        {todos.map((item) => (
          <Card
            key={item.id}
            todo={item}
            onDeleteTodo={deleteToDo}
            onUpdateTodo={updateToDo}
          />
        ))}
      </div> 
      <Toaster position='top-right' />
    </div>
  );
}
