import React from "react";
import {
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import Cookies from "universal-cookie";
import { IAuth } from "./index";
const cookies = new Cookies();

export const GoogleAuth: React.FC<IAuth> = ({ setAuthTrue }) => {
  const signGoogleHandle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setAuthTrue(true);
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
