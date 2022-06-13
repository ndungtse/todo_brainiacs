import React, { useState, useEffect } from "react";
import { BiPlus, BiEdit } from "react-icons/bi";
import "../App.css";
import { useTodos } from "../contexts/AppContext";
import { api } from "../contexts/AppContext";
import { images } from "../images/image";

function Form() {
  const { todos, setTodos, getTodos, updateTodo, input, setInput, edit, setEdit, user } =
    useTodos();

  const submitTodo = async (e) => {
    e.preventDefault();
    const image = images.filter(img=> input.includes(img.name[0]) || input.includes(img.name[1]))
    console.log(image);
    const todo = {
      text: input,
      image: image.length === 0?'rel': image[0].image,
      username: user
    };
    setInput("");
    setTodos([...todos, todo]);
     const res = await api.post('/newTodo', todo)
     console.log(res);
     await getTodos()
  };

  return (
    <form className="w-3/4 mt-5 mx-auto rounded-3xl flex items-center justify-between bg-sky-100">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-[80%] outline-none border-none mx-auto bg-transparent text-black text-xl px-2"
        type="text"
        placeholder={edit ? "Edit a Todo" : "Add a Todo"}
      />
      <button
        type="submit"
        onClick={edit ? updateTodo : submitTodo}
        className=" rounded-full p-4 bg-sky-600"
      >
        {edit ? <BiEdit /> : <BiPlus className=" text-white" />}
      </button>
    </form>
  );
}

export default Form;
