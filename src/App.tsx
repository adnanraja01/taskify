import "./App.css";
import InputField from "./components/InputField";
import { useState } from "react";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [Todos, setTodos] = useState<Todo[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...Todos, { id: Math.random(), todo, isDone: false }]);
      setTodo(" ");
    }
  };
  return (
    <div className=" w-full h-[100vh] bg-gradient-to-br from-[#0062ff]  to-[#61efff]">
      <h1 className="text-s40 text-center font-bold text-white pt-[2rem]">
        Taskify
      </h1>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      <TodoList todos={Todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
