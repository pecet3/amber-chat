import React from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import Context, { TContext } from "../../ChatContext";

const cookies = new Cookies();

export const LogIn: React.FC = () => {
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });
  const { setIsAuth } = React.useContext(Context) as TContext;
  const loginOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const logIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginInput.email,
        loginInput.password
      );
      setIsAuth(true);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        logIn();
      }}
    >
      <legend>Do you have an account? Log in, now!</legend>
      <input
        type="text"
        className="inputElement"
        value={loginInput.email}
        placeholder="Enter your name"
        name="email"
        onChange={loginOnChange}
      />
      <input
        type="password"
        className="inputElement"
        value={loginInput.password}
        name="password"
        placeholder="password"
        onChange={loginOnChange}
      />

      <button className="submitButton px-6" onClick={() => console.log()}>
        Log In
      </button>
    </form>
  );
};
