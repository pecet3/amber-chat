import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import Cookies from "universal-cookie";
import { IAuth } from "./index";
import Context, { TContext } from "../../ChatContext";
const cookies = new Cookies();

export const GoogleAuth: React.FC = () => {
  const { setIsAuth } = React.useContext(Context) as TContext;
  const signGoogleHandle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button onClick={() => signGoogleHandle()} className="submitButton my-8">
      Sign in with Google
    </button>
  );
};
