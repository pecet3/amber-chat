import React from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase-config";
import Cookies from "universal-cookie";
import { IAuth } from "./index";
import Context, { TContext } from "../../ChatContext";

const cookies = new Cookies();
export const Anonymous: React.FC<IAuth> = ({ setAuthTrue }) => {
  const [nameInput, setNameInput] = React.useState("");
  const { setAnonymousUser } = React.useContext(Context) as TContext;

  const getIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      cookies.set("auth-token", result.user.refreshToken);
      setAuthTrue(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="my-12 flex justify-center"
      onSubmit={(e) => {
        if (nameInput === "") return;
        e.preventDefault();
        getIn();
        setAnonymousUser(nameInput);
      }}
    >
      <input
        type="text"
        name="name"
        className="inputElement"
        placeholder="Enter your name..."
        value={nameInput}
        onChange={(e) => setNameInput(([e.target.name] = e.target.value))}
      />
      <button className="submitButton">Get In</button>
    </form>
  );
};
