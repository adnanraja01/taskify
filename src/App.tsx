import "./App.css";
import { config } from "./config/config";
import { initializeApp } from "firebase/app";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthRoute from "./components/AuthRoute";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
