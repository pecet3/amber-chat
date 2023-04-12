import React from "react";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export interface IProvider {
  children: React.ReactNode;
}
export type TContext = {
  signGoogleHandle: () => Promise<void>;
  isAuth: boolean;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ChatContextProvider: React.FC<IProvider> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(!!cookies.get("auth-token"));
  const [room, setRoom] = React.useState("");

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
    <Context.Provider
      value={{ signGoogleHandle, isAuth, room, setRoom, setIsAuth }}
    >
      {children}
    </Context.Provider>
  );
};

const Context = React.createContext<TContext | null>(null);
export default Context;
