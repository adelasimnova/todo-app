import * as React from 'react';
import './Card.css';

export function Card(props) {
  function handleDelete() {
    props.onDeleteTodo(props.todo.id);
  }
  function handleDone(event) {
    props.onUpdateTodo(props.todo.id, { done: event.target.checked });
  }
  return (
    <div className="card-container">
      <div className="card-left">
        <input className="card-checkbox" type="checkbox" checked={props.todo.done} onChange={handleDone} />
        <h2 className={props.todo.done ? 'card-title strike' : 'card-title'}>{props.todo.title}</h2>
      </div>
      <button className="delete-button" type="submit" onClick={handleDelete}>-</button>
    </div>
  );
}
