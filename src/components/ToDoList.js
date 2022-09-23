import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

export default function TodoList(props) {
  const { todo, handleDelete, completeTodo } = props;
  const navigate = useNavigate();
  return (
    <div
      className={todo.complete ? "todo-row complete": "todo-row"}
    >
      {todo.task}
      <div className="iconsContainer">
        <RiCloseCircleLine
            style={{ marginRight: 5 }}
            onClick={() => handleDelete(todo.id)}
        />
        <BiCheckCircle
            style={{ marginRight: 5 }} 
            onClick={() => completeTodo(todo.id)} />

        <AiFillEdit 
            onClick={() => navigate(`/task/${todo.id}`)} />
      </div>
    </div>
  );
}