import React from "react";
import { auth, provider } from "./firebase-config";
import { signInWithPopup, User } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export interface IProvider {
  children: React.ReactNode;
}
export type TStatus = {
  status: string;
  message: string;
};
export type TContext = {
  signGoogleHandle?: () => Promise<void>;
  isAuth: boolean;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  anonymousUser: string;
  setAnonymousUser: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  status: TStatus;
  setStatus: React.Dispatch<React.SetStateAction<TStatus>>;
};
export const ChatContextProvider: React.FC<IProvider> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(!!cookies.get("auth-token"));
  const [room, setRoom] = React.useState("");
  const [anonymousUser, setAnonymousUser] = React.useState("uknown");
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState({
    status: "loading",
    message: "",
  });

  return (
    <Context.Provider
      value={{
        isAuth,
        room,
        setRoom,
        setIsAuth,
        anonymousUser,
        setAnonymousUser,
        user,
        setUser,
        status,
        setStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const Context = React.createContext<TContext | null>(null);
export default Context;
