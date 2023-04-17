import React from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Cookies from "universal-cookie";
import Context, { TContext } from "../../ChatContext";

const cookies = new Cookies();

export const LogIn: React.FC = () => {
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });
  const { setIsAuth, setUser, user } = React.useContext(Context) as TContext;
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
      setUser(result.user);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (loginInput.email.length < 6 || loginInput.password.length < 6)
          return alert("Podano złe dane użytkownika");
        logIn();
      }}
    >
      <legend>Log in, here!</legend>
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
