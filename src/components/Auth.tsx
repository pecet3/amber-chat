import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signInAnonymously, getAuth } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface IAuth {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
}
export const Auth: React.FC<IAuth> = ({ setAuthTrue }) => {
  const [input, setInput] = React.useState("");

  const signGoogleHandle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setAuthTrue((prev) => (prev = true));
    } catch (err) {
      console.error(err);
    }
  };
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
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
            alert(input);
          }}
        >
          <input
            type="text"
            className="max-w-[162px] rounded-md p-2 text-center shadow-md"
            value={input}
            placeholder="Enter your name..."
            onChange={handleInputChange}
          />
          <button className="submitButton px-6">Sign in as Guest</button>
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
