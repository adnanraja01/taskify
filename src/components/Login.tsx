import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface Props {}

const Login: React.FC<Props> = (props) => {
  const Auth = getAuth();
  const Navigate = useNavigate();
  const [authing, setAuthing] = useState<boolean>(false);

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
  return (
    <div className="flex justify-center items-center w-full h-[100vh] bg-gradient-to-br from-[#0062ff]  to-[#61efff]">
      <div className="flex flex-col justify-evenly items-center m-auto w-[40rem] h-[30rem] bg-white rounded-[2rem]">
        <p className="text-s30 text-center font-bold ">Sign in with Google</p>
        <button
          className="bg-gradient-to-r from-[#0062ff]  to-[#61efff] w-[90%] text-white px-[1rem] py-[1.8rem]  rounded-[1rem] text-s24"
          onClick={() => signInWithGoogle()}
          disabled={authing}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
