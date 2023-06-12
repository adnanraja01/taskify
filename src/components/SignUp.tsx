import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import Toast from "./Toast";

interface Props {}

const SignUp: React.FC<Props> = (props) => {
  const Auth = getAuth();
  const Navigate = useNavigate();
  const [authing, setAuthing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const toggleShowPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(Auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setAuthing(false);
      });
  };
  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In");

    // console.log(email, password);
    setAuthing(true);
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setError(false);
        Navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          console.log("Already in use");
          setError(true);
        }

        // ..
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh] bg-gradient-to-br from-[#0062ff]  to-[#61efff]">
      <div className="flex flex-col justify-around items-center  w-[40rem] h-[50rem] bg-white rounded-[2rem]">
        <p className="text-s30 text-center font-bold ">Sign Up</p>
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
            {error && <Toast message="Email already exists" />}
            <button
              className="ml-auto bg-gradient-to-r from-[#0062ff]  to-[#61efff] px-[1rem] py-[.6rem] text-s12 text-white rounded-[1rem] w-[33%]"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#0062ff]  to-[#61efff] text-white mt-[1.5rem] text-s14 font-semibold px-[1rem] py-[.8rem] rounded-[1rem]"
          >
            Sign up
          </button>
        </form>
        <button
          className="bg-gradient-to-r from-[#0062ff]  to-[#61efff] w-[90%] text-white px-[1rem] py-[1.2rem]  rounded-[1rem] text-s20"
          onClick={() => signInWithGoogle()}
          disabled={authing}
        >
          Continue with Google
        </button>
        <p className="text-s14">
          Already have an account?
          <Link to="/login">
            <span className="cursor-pointer  text-[blue]"> Log In </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
