import * as React from 'react';
import './ToDoForm.css';
import { ToDo } from '../types/Todo';

export function ToDoForm(props: {onCreateTodo: (todo: ToDo)=>void}) {
  const [text, setText] = React.useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleSubmit() {
    props.onCreateTodo({ id: crypto.randomUUID(), title: text, done: false });
    setText('');
  }

  return (
    <div className="to-do-form">
      <input className="to-do-input" placeholder="ENTER TASK" onChange={handleChange} value={text} />
      <button className="to-do-button" type="submit" onClick={handleSubmit}>+</button>
    </div>
  );
}
