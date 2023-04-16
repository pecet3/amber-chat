import React from "react";
import { auth, provider } from "../../firebase-config";
import {
  signInAnonymously,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import Cookies from "universal-cookie";
import { GoogleAuth } from "./GoogleAuth";
const cookies = new Cookies();

export type TLoginData = {
  email: string;
  password: string;
};
export interface ILogin {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const LogIn: React.FC<ILogin> = ({ setAuthTrue, user, setUser }) => {
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
        className="max-w-[162px] rounded-md p-2 text-center shadow-md"
        value={loginInput.email}
        placeholder="Enter your name,"
        name="email"
        onChange={loginOnChange}
      />
      <input
        type="password"
        className="max-w-[162px] rounded-md p-2 text-center shadow-md"
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
