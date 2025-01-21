import * as React from 'react';
import './ToDoItem.css';

interface ToDoItemData {
  todo: {
    id: string;
    done: boolean;
    title: string;
  }
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (todoId: string, updatedTodo: {done: boolean}) => void;
}

export function ToDoItem(props:ToDoItemData) {
  function handleDelete() {
    props.onDeleteTodo(props.todo.id);
  }
  function handleDone(event: React.ChangeEvent<HTMLInputElement>) {
    props.onUpdateTodo(props.todo.id, { done: event.target.checked });
  }

  return (
    <div className="border-4 border-white rounded-[10px] my-[5px] px-[10px] py-[10px] w-[calc(100%-20px)] max-w-[810px] flex items-center justify-between">
      <div className="flex items-center cursor-pointer">
        <input className="w-5 h-5 cursor-pointer" type="checkbox" checked={props.todo.done} onChange={handleDone} />
        <h2 
          className={`ml-2 font-light ${props.todo.done ? 'line-through text-gray-500' : ''}`}>
          {props.todo.title}
        </h2>
      </div>
      <button className="delete-button" type="submit" onClick={handleDelete}>-</button>
    </div>
  );
}
