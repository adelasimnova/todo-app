import * as React from "react";
import "./ToDoItem.css";

interface ToDoItemData {
  todo: {
    id: string;
    done: boolean;
    title: string;
  };
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (todoId: string, updatedTodo: { done: boolean }) => void;
}

export function ToDoItem(props: ToDoItemData) {
  function handleDelete() {
    props.onDeleteTodo(props.todo.id);
  }
  function handleDone(event: React.ChangeEvent<HTMLInputElement>) {
    props.onUpdateTodo(props.todo.id, { done: event.target.checked });
  }

  return (
    <div className="todo-item-container">
      <div className="todo-item-left">
        <input
          data-testid="todo-item-checkbox"
          className="todo-item-checkbox"
          type="checkbox"
          checked={props.todo.done}
          onChange={handleDone}
        />
        <h2
          className={`todo-item-title ${props.todo.done ? "line-through text-gray-500" : ""}`}
        >
          {props.todo.title}
        </h2>
      </div>
      <button
        className="todo-delete-button"
        type="submit"
        onClick={handleDelete}
      >
        -
      </button>
    </div>
  );
}
