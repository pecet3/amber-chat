import React from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { GoogleAuth } from "./GoogleAuth";
import { LogIn } from "./LogIn";
import { Register } from "./Register";
import { Header } from "../../common/Header";

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
    <>
      <Header />
      <Register setAuthTrue={setAuthTrue} user={user} setUser={setUser} />
      <LogIn setAuthTrue={setAuthTrue} user={user} setUser={setUser} />
      <GoogleAuth setAuthTrue={setAuthTrue} />
    </>
  );
};
