import * as React from "react";
import "./ToDoForm.css";
import { ToDo } from "../types/Todo";
import { useNavigate } from "react-router-dom";

export function ToDoForm(props: { onCreateTodo: (todo: ToDo) => void }) {
  const [text, setText] = React.useState("");
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleSubmit() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
    props.onCreateTodo({
      id: crypto.randomUUID(),
      title: text,
      description: "",
      done: false,
      userId: userId!,
    });
    setText("");
  }

  return (
    <div className="to-do-form">
      <input
        className="to-do-input"
        placeholder="ENTER TASK"
        onChange={handleChange}
        value={text}
      />
      <button className="to-do-button" type="submit" onClick={handleSubmit}>
        +
      </button>
    </div>
  );
}
