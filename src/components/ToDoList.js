import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function TodoList(props) {
  const { todo, handleDelete, handleComplete } = props;
  const navigate = useNavigate();
  return (
    <div
      className={todo.complete ? "todo-row done": "todo-row"}
    >
      {todo.task}
      <div className="icons-list">
        <MdDeleteForever
            style={{ marginRight: 7 }}
            onClick={() => handleDelete(todo.id)}
        />
        <HiCheckCircle
            style={{ marginRight: 7 }} 
            onClick={() => handleComplete(todo.id)} />

        <AiFillEdit 
            onClick={() => navigate(`/task/${todo.id}`)} />
      </div>
    </div>
  );
}