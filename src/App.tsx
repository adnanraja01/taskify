import "./App.css";
import InputField from "./components/InputField";
import { useState, useEffect } from "react";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { config } from "./config/config";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthRoute from "./components/AuthRoute";

initializeApp(config.firebaseConfig);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
