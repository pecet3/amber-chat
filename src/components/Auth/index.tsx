import React from "react";
import { auth, provider } from "../../firebase-config";
import {
  signInAnonymously,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import Cookies from "universal-cookie";
import { GoogleAuth } from "./GoogleAuth";
import { LogIn } from "./LogIn";
import { Register } from "./Register";
const cookies = new Cookies();

export interface IAuth {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
}
export type TLoginData = {
  email: string;
  password: string;
};
export const Auth: React.FC<IAuth> = ({ setAuthTrue }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const logOut = async () => {
    await signOut(auth);
  };

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unSubscribe();
  }, []);
  return (
    <div className="my-20">
      <p>Welcome to...</p>
      <h1 className="mb-10 text-4xl">JakubChat</h1>
      <h1 className="text-4xl">{user && user.email}</h1>
      <Register setAuthTrue={setAuthTrue} user={user} setUser={setUser} />
      <LogIn setAuthTrue={setAuthTrue} user={user} setUser={setUser} />
      <GoogleAuth setAuthTrue={setAuthTrue} />
    </div>
  );
};
