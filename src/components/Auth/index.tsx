import React from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { GoogleAuth } from "./GoogleAuth";
import { LogIn } from "./LogIn";
import { Register } from "./Register";
import { Header } from "../../common/Header";
import { Anonymous } from "./Anonymous";

export interface IAuth {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
}
export type TLoginData = {
  email: string;
  password: string;
};
export const Auth: React.FC<IAuth> = ({ setAuthTrue }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [click, setClick] = React.useState(false);

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
      <Anonymous setAuthTrue={setAuthTrue} />
      {click ? (
        <LogIn setAuthTrue={setAuthTrue} />
      ) : (
        <Register setAuthTrue={setAuthTrue} />
      )}

      <button
        className="submitButton my-8"
        onClick={() => setClick((prev) => (prev = !prev))}
      >
        I have an account
      </button>
      <GoogleAuth setAuthTrue={setAuthTrue} />
    </>
  );
};
