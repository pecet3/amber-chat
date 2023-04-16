import React from "react";
import { auth, provider } from "../firebase-config";
import {
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface IAuth {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
}
export type TLoginData = {
  email: string;
  password: string;
};
export const Auth: React.FC<IAuth> = ({ setAuthTrue }) => {
  const [loginEmailInput, setLoginEmailInput] = React.useState("");
  const [loginPasswordInput, setLoginPasswordInput] = React.useState("");
  const [registerEmailInput, setRegisterEmailInput] = React.useState("");
  const [registerPasswordInput, setRegisterPasswordInput] = React.useState("");
  const [user, setUser] = React.useState<User | null>(null);

  const signGoogleHandle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setAuthTrue(true);
    } catch (err) {
      console.error(err);
    }
  };
  const registerEmailOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value && setRegisterEmailInput(e.currentTarget.value);
  };
  const registerPasswordOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value && setRegisterPasswordInput(e.currentTarget.value);
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmailInput,
        registerPasswordInput
      );
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser((prev) => (prev = currentUser));
  // });
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
          }}
        >
          <legend>Don't have an account? Register here!</legend>
          <input
            type="text"
            className="max-w-[162px] rounded-md p-2 text-center shadow-md"
            value={registerEmailInput}
            placeholder="Enter your email"
            onChange={registerEmailOnChange}
          />
          <input
            type="password"
            className="max-w-[162px] rounded-md p-2 text-center shadow-md"
            value={registerPasswordInput}
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
            value={loginEmailInput}
            placeholder="Enter your name..."
            onChange={() => console.log("Enter your email")}
          />
          <input
            type="text"
            className="max-w-[162px] rounded-md p-2 text-center shadow-md"
            value={loginPasswordInput}
            placeholder="Enter your name..."
            onChange={() => console.log("Enter your password")}
          />

          <button className="submitButton px-6" onClick={() => console.log()}>
            Log In
          </button>
        </form>
        <button
          onClick={() => signGoogleHandle()}
          className="submitButton my-8"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
