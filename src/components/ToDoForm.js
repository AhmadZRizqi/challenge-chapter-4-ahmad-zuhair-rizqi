import React, { useState } from "react";
import '../pages/Home'

export default function TodoForm(props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTodo(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={input}
        className="todo-input"
        placeholder="Input / Edit todo"
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit" className="todo-button">
        Add/Edit Todo
      </button>
    </form>
  );
}
