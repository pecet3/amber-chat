import React from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { GoogleAuth } from "./GoogleAuth";
import { LogIn } from "./LogIn";
import { Register } from "./Register";
import { Header } from "../../common/Header";
import { Anonymous } from "./Anonymous";

export const Auth: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
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
