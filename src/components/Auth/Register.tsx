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
import { LogIn } from "./LogIn";
const cookies = new Cookies();

export interface IRegister {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export type TLoginData = {
  email: string;
  password: string;
};
export const Register: React.FC<IRegister> = ({
  setAuthTrue,
  user,
  setUser,
}) => {
  const [registerInput, setRegisterInput] = React.useState<TLoginData>({
    email: "",
    password: "",
  });

  const registerOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerInput.email,
        registerInput.password
      );
      setAuthTrue(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="m-auto flex max-w-[240px] flex-col 
        items-center gap-3 rounded-lg border-2
         border-blue-400 bg-slate-300 p-2 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        register();
      }}
    >
      <legend>Don't have an account? Register here!</legend>
      <input
        type="text"
        className="max-w-[162px] rounded-md p-2 text-center shadow-md"
        name="email"
        value={registerInput.email}
        placeholder="Enter your email"
        onChange={registerOnChange}
      />
      <input
        type="password"
        name="password"
        className="max-w-[162px] rounded-md p-2 text-center shadow-md"
        value={registerInput.password}
        placeholder="Your password"
        onChange={registerOnChange}
      />
      <button className="submitButton px-6">Register</button>
    </form>
  );
};
