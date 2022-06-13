import React, { useContext, useState, useEffect, useCallback , use} from "react";
import axios from "axios";
import { images } from "../images/image";

const TodoContext = React.createContext();
export const api = axios.create({
  baseURL: `https://wepanga.herokuapp.com`,
});
export function useTodos() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState({});
  const [edit, setEdit] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [input, setInput] = useState("");
  const [isImage, setIsImage] = useState(false)

  const getSavedUser = async() => {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user.username);
      console.log(user);
      setIsLogedIn(true);
    }
    return;
  };

  const getTodos = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    console.log(user.username);
    const res = await api.get(`/todos/${user.username}`);
    const data = await res.data;
    console.log(data);
    setTodos(data)
  };
  const removeTodo = (todo) => {
    setTodos(todos.filter((t) => t._id === todo._id));
  };
  const AddTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  const editTodo = (todo) => {
    setEdit(!edit);
    setInput(todo.text);
    setTodo(todo);
  };

  const updateTodo = async(e) => {
    e.preventDefault();
    const image = images.filter(img=> input.includes(img.name[0]) || input.includes(img.name[1]))
    todo.text = input;
    todo.image = image.length === 0?'rel': image[0].image,
     setTodos(
       todos.map((td) => {
         if (td._id === todo._id) {
           return {
             ...td,
             text: input,
           };
         }
         return td;
       })
     );
     const res = await api.put(`/todos/${todo._id}`, {...todo, text: input})
     console.log(res);
    setInput("");
    setEdit(false);
  };

  const deleteTodo = async(todo) => {
    setTodos(todos.filter((t) => t._id !== todo._id));
    const res = await api.delete(`/todos/${todo._id}`)
    console.log(res);
  };

  const setCompleted = async(todo) => {
    console.log(todo._id);
    setTodos(
      todos.map((td) => {
        if (td._id === todo._id) {
          return {
            ...td,
            completed: !td.completed,
          };
        }
        return td;
      })
    );
    const res = await api.put(`/todos/${todo._id}`, {...todo, completed: !todo.completed})
    console.log(res);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // useCallback(() => {
  //     getTodos()
  //   },
  //   [todos],
  // )

  useEffect(() => {
    getSavedUser();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        user,
        todos,
        setCompleted,
        edit,
        setEdit,
        setTodos,
        setUser,
        input,
        setInput,
        editTodo,
        updateTodo,
        deleteTodo,
        todo,
        AddTodo,
        isLogedIn,
        setIsLogedIn,
        removeTodo,
        isImage,
        setIsImage,
        getTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
