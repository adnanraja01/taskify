// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "./Toast";

interface Props {}

const LogIn: React.FC<Props> = (props) => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authing, setAuthing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  //dkjfhdkjsfhkjsdfh
  const auth = getAuth();
  const signInWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthing(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        Navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          setError(true);
        }
        console.log("Error", errorMessage, "------", errorCode);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-gradient-to-br from-[#0062ff]  to-[#61efff] pb-[-2rem]">
        <div className="flex flex-col justify-around items-center  w-[40rem] h-[40rem] bg-white rounded-[2rem] pt-[-2rem]">
          <p className="text-s30 text-center font-bold ">Log In</p>
          <form onSubmit={signInWithEmail} className="flex flex-col w-[90%] ">
            <input
              className="px-[1.2rem] border focus:outline-none rounded-[1rem] py-[1.2rem] text-s16"
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="px-[1.2rem] border focus:outline-none rounded-[1rem] py-[1.2rem] text-s16 mt-[2rem]"
              placeholder="Enter Your Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-between items-center mt-[1rem]">
              {error && (
                <Toast message="You have entered an invalid email or password" />
              )}
              <button
                className="ml-auto bg-gradient-to-r from-[#0062ff]  to-[#61efff] px-[1rem] py-[.6rem] text-s12 text-white rounded-[1rem] w-[33%] "
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#0062ff]  to-[#61efff] text-white mt-[1.5rem] text-s14 font-semibold px-[1rem] py-[1.2rem] rounded-[1rem]"
            >
              Sign In
            </button>
          </form>
          <p className="text-s14">
            Don't have an account?
            <Link to="/signup">
              <span className="cursor-pointer  text-[blue]"> Sign Up </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogIn;
