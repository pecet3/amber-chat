import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import Context, { TContext } from "../ChatContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const LogOutButton: React.FC = () => {
  const { setIsAuth } = React.useContext(Context) as TContext;
  const logOut = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
      cookies.remove("auth-token");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <button onClick={() => logOut()} className="submitButton my-6">
      Log Out
    </button>
  );
};
