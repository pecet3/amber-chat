import React from "react";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export interface IProvider {
  children: React.ReactNode;
}
export type TContext = {
  signGoogleHandle: () => void;
  isAuth: Boolean;
};
export const ChatContextProvider: React.FC<IProvider> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(!!cookies.get("auth-token"));

  const signGoogleHandle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth((prev) => (prev = true));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Context.Provider value={{ signGoogleHandle, isAuth }}>
      {children}
    </Context.Provider>
  );
};

interface IAuth {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Context = React.createContext<TContext | null>(null);
export default Context;
