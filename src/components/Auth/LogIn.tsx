import React from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { IAuth } from "./index";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export type TLoginData = {
  email: string;
  password: string;
};
export const LogIn: React.FC<IAuth> = ({ setAuthTrue }) => {
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });

  const loginOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const logIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginInput.email,
        loginInput.password
      );
      setAuthTrue(true);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <form
      className="m-auto flex max-w-[240px] flex-col 
          items-center gap-3 rounded-lg border-2
         border-blue-400 bg-slate-300 p-2 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        logIn();
      }}
    >
      <legend>Do you have an account? Log in, now!</legend>
      <input
        type="text"
        className="inputElement"
        value={loginInput.email}
        placeholder="Enter your name,"
        name="email"
        onChange={loginOnChange}
      />
      <input
        type="password"
        className="inputElement"
        value={loginInput.password}
        name="password"
        placeholder="your password"
        onChange={loginOnChange}
      />

      <button className="submitButton px-6" onClick={() => console.log()}>
        Log In
      </button>
    </form>
  );
};
