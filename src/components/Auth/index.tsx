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
  return (
    <>
      <Header />
      <p className="my-6">Log in as Guest</p>
      <Anonymous />
      <p className="my-6">or...</p>
      {click ? <LogIn /> : <Register />}
      <div className="my-6 flex justify-center gap-2">
        <button
          className="submitButton"
          onClick={() => setClick((prev) => (prev = !prev))}
        >
          I have an account
        </button>
        <GoogleAuth />
      </div>
    </>
  );
};
