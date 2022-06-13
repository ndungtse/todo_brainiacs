import React from "react";
import Todo from "./todo";
import { useTodos } from "../contexts/AppContext";

function TodoList() {
  const { todos } = useTodos();
  return (
    <div className="w-full flex flex-col overflow-auto h-[70vh]">
      {todos.map((todo, index) => (
        <Todo key={index} index={index+1} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
