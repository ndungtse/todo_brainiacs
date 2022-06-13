import React from "react";
import "../App.css";
import { api, useTodos } from "../contexts/AppContext";

function Login() {
  const { setIsLogedIn } = useTodos();
  const [loginInfo, setLoginInfo] = React.useState({ names: "", hobbies: "" });

  const submitInfo = async (e) => {
    e.preventDefault();
    const res = await api.post("/users", {
      username: loginInfo.names,
      hobbies: loginInfo.hobbies,
    });
    console.log(res);
    if (res.status === 200) {
      const res = await api.get(`/users/${loginInfo.names}`);
      const user = await res.data;
      localStorage.setItem("user", JSON.stringify(user));
      setIsLogedIn(true);
      window.location.replace("https://panga.vercel.app/");
    }
  };

  return (
    <div className="w-full App h-screen flex items-center justify-center">
      <form action="" className="w-[500px] min-w-[300px] bg-white h-[50vh]">
        <h1 className="text-2xl font-semibold text-center">
          Get started with with Panga
        </h1>
        <div className="flex flex-col h-full justify-center">
          <div className="flex flex-col mx-auto w-4/5">
            <label htmlFor="">Names</label>
            <input
              type="text"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, names: e.target.value })
              }
              placeholder="Enter your names"
              className="border-[1px] h-[50px] outline-none focus:ring-2 border-cyan-400 px-2 mt-2"
            />
          </div>
          <div className="flex flex-col mx-auto w-4/5 mt-5">
            <label htmlFor="">Hobbies</label>
            <textarea
              type="text"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, hobbies: e.target.value })
              }
              placeholder="Describe what you like (optional)"
              className="border-[1px] focus:ring-2 outline-none h-[100px] border-cyan-400 px-2 mt-2"
            />
          </div>
          <input
            type="submit"
            onClick={submitInfo}
            value="Get Started"
            className="px-3 py-2 text-white mt-2 bg-blue-800 w-1/2 mx-auto cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
