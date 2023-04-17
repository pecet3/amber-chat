import React from "react";
import { motion } from "framer-motion";
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
      <motion.div
        animate={{ x: 0, y: 0, scale: 1 }}
        initial={{ x: -300, y: 0, scale: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="my-6">Log in as Guest</p>
        <Anonymous />
      </motion.div>

      <motion.div
        animate={{ x: 0, y: 0, scale: 1 }}
        initial={{ x: 300, y: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        drag={true}
      >
        <p className="my-6">or...</p>
        {click ? <LogIn /> : <Register />}
      </motion.div>
      <div className="my-6 flex justify-center gap-2">
        <motion.div
          animate={{ x: 0, y: 0, scale: 1 }}
          initial={{ x: -300, y: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GoogleAuth />
        </motion.div>

        <motion.div
          animate={{ x: 0, y: 0, scale: 1 }}
          initial={{ x: 300, y: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GoogleAuth />
        </motion.div>
      </div>
    </>
  );
};
