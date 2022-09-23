import React, { useState } from "react";
import '../pages/Home'
import { useNavigate } from 'react-router-dom';

export default function TodoForm(props) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTodo(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
        placeholder="Input / Edit todo"
      />

      <button type="submit" className="todo-button">
        Add/Edit Todo
      </button>
    </form>
  );
}
