import React, { useState, useEffect } from "react";
import { BiTrash, BiEdit, BiCheck } from "react-icons/bi";
import { useTodos } from "../contexts/AppContext";
import '../App.css'

function Todo({index, todo}) {
  const { setCompleted, editTodo,isImage, deleteTodo } = useTodos()

  return (
    <>
      {!isImage?(<div
        className={`flex mt-8 items-center p-3 rounded-lg
     ${todo.completed?'bg-[#264357]': 'bg-slate-200'}  justify-between`}
      >
        {todo.image !== "rel" ? (
          <img className="w-[70px]" src={todo.image} alt="" />
        ) : (
          <div
            className={`p-4 px-6 text-3xl ${
              todo.completed ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            {index}
          </div>
        )}
        <div className={ `flex flex-col w-full ml-3  ${todo.completed?'text-white':'text-black'}`}>
          <div className={`title flex items-center w-full`}>
            <p className="text-xl font-semibold">Title:</p>
            <p
              className={`ml-3 box-border w-full
           text-xl ${todo.completed ? "compl" : ""}`}
            >
              {todo.text}
            </p>
          </div>
          <div className=" flex text-3xl mt-3">
            <p className="text-xl font-semibold">actions:</p>
            <BiCheck
              onClick={() => setCompleted(todo)}
              className="text-white ml-3 bg-green-500 cursor-pointer"
            />
            <BiEdit
              onClick={() => editTodo(todo)}
              className="cursor-pointer ml-3"
            />
            <BiTrash
              onClick={() => deleteTodo(todo)}
              className="cursor-pointer ml-3 text-red-500"
            />
          </div>
        </div>
      </div>): ''}
    </>
  );
}

export default Todo;
