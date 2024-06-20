import * as React from 'react';
import './ToDoForm.css';

export function ToDoForm(props) {
  const [text, setText] = React.useState('');

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit() {
    props.onCreateTodo({ id: crypto.randomUUID(), title: text });
    setText('');
  }

  return (
    <div className="to-do-form">
      <input className="to-do-input" placeholder="ENTER TASK" onChange={handleChange} value={text} />
      <button className="to-do-button" type="submit" onClick={handleSubmit}>+</button>
    </div>
  );
}
