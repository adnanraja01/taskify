import React from "react";
import InputField from "../components/InputField";
import { useState } from "react";
import { Todo } from "../model";
import TodoList from "../components/TodoList";
import { getAuth, signOut } from "firebase/auth";

const Home = () => {
  const [todo, setTodo] = useState<string>("");
  const [Todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...Todos, { id: Math.random(), todo, isDone: false }]);
      setTodo(" ");
    }
  };

  const auth = getAuth();
  return (
    <div className=" w-full h-[100vh] bg-gradient-to-br from-[#0062ff]  to-[#61efff]">
      <div className="container flex justify-center items-center pt-[2rem]">
        <h1 className="text-s40 text-center font-bold text-white  mx-auto">
          Taskify
        </h1>
        <div>
          <button
            onClick={() => signOut(auth)}
            className="bg-gradient-to-r from-blue-500 via-blue-500 to-gray-500 shadow-xl active:shadow-sm px-[1rem] py-[.6rem] rounded-[1rem] text-s20 text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      <TodoList todos={Todos} setTodos={setTodos} />
    </div>
  );
};

export default Home;
