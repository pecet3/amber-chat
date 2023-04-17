import React from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { GoogleAuth } from "./GoogleAuth";
import { LogIn } from "./LogIn";
import { Register } from "./Register";
import { Header } from "../../common/Header";
import { Anonymous } from "./Anonymous";
import Context, { TContext } from "../../ChatContext";

export const Auth: React.FC = () => {
  const { user, setUser } = React.useContext(Context) as TContext;
  const [click, setClick] = React.useState(false);

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unSubscribe();
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <Header />
      <Anonymous />
      <p className="mt-12">or...</p>
      {click ? <LogIn /> : <Register />}

      <button
        className="submitButton my-8"
        onClick={() => setClick((prev) => (prev = !prev))}
      >
        I have an account
      </button>
      <GoogleAuth />
    </>
  );
};
