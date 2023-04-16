import React from "react";
import { auth, provider } from "../../firebase-config";
import {
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import Cookies from "universal-cookie";
import { GoogleAuth } from "./GoogleAuth";
const cookies = new Cookies();

export interface IAuth {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
}
export type TLoginData = {
  email: string;
  password: string;
};
export const Auth: React.FC<IAuth> = ({ setAuthTrue }) => {
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });
  const [registerInput, setRegisterInput] = React.useState<TLoginData>({
    email: "",
    password: "",
  });

  const [user, setUser] = React.useState({});

  const registerEmailOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };
  const registerPasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerInput.email,
        registerInput.password
      );
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-20">
      <p>Welcome to...</p>
      <h1 className="mb-10 text-4xl">JakubChat</h1>
      <div>
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
            onChange={registerEmailOnChange}
          />
          <input
            type="password"
            name="password"
            className="max-w-[162px] rounded-md p-2 text-center shadow-md"
            value={registerInput.password}
            placeholder="Your password"
            onChange={registerPasswordOnChange}
          />
          <button className="submitButton px-6">Register</button>
        </form>

        <form
          className="m-auto flex max-w-[240px] flex-col 
          items-center gap-3 rounded-lg border-2
         border-blue-400 bg-slate-300 p-2 py-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            className="max-w-[162px] rounded-md p-2 text-center shadow-md"
            value={loginInput.email}
            placeholder="Enter your name..."
            name="loginEmail"
            onChange={() => console.log("Enter your email")}
          />
          <input
            type="text"
            className="max-w-[162px] rounded-md p-2 text-center shadow-md"
            value={loginInput.password}
            name="loginPassword"
            placeholder="Enter your name..."
            onChange={() => console.log("Enter your password")}
          />

          <button className="submitButton px-6" onClick={() => console.log()}>
            Log In
          </button>
        </form>
        <GoogleAuth setAuthTrue={setAuthTrue} />
      </div>
    </div>
  );
};
