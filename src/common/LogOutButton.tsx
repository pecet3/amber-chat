import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import Context, { TContext } from "../ChatContext";
import Cookies from "universal-cookie";
import { MdOutlineExitToApp } from "react-icons/md";

const cookies = new Cookies();
export const LogOutButton: React.FC = () => {
  const { setIsAuth, setRoom } = React.useContext(Context) as TContext;
  const logOut = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
      setRoom("");
      cookies.remove("auth-token");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <button
      onClick={() => logOut()}
      className="submitButton md:text-md m-auto flex justify-center text-sm"
    >
      <MdOutlineExitToApp size="24" />
      Log Out
    </button>
  );
};
