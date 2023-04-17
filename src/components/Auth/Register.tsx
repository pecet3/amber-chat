import React from "react";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import Cookies from "universal-cookie";
import Context, { TContext } from "../../ChatContext";
const cookies = new Cookies();

export const Register: React.FC = () => {
  const [registerInput, setRegisterInput] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const { setIsAuth, user, setUser } = React.useContext(Context) as TContext;
  const [isClicked, setIsClicked] = React.useState(false);

  const registerOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        registerInput.email,
        registerInput.password
      );
      cookies.set("auth-token", result.user.refreshToken);
      setUser(result.user);
    } catch (err) {
      alert(err);
    }
  };

  const updateDisplayName = async () => {
    try {
      updateProfile(auth.currentUser as User, {
        displayName: registerInput.name,
      });
      setIsAuth(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {!isClicked ? (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            register();
            setIsClicked(
              (prev) =>
                (prev =
                  registerInput.email && registerInput.password !== ""
                    ? true
                    : false)
            );
          }}
        >
          <legend>Don't have an account? Register here!</legend>
          <input
            type="text"
            className="inputElement"
            name="email"
            value={registerInput.email}
            placeholder="Enter your email"
            onChange={registerOnChange}
          />
          <input
            type="password"
            name="password"
            className="inputElement"
            value={registerInput.password}
            placeholder="password"
            onChange={registerOnChange}
          />

          <button className="submitButton px-6">Register</button>
        </form>
      ) : (
        <form
          className="m-auto flex max-w-[240px] flex-col 
        items-center gap-3 rounded-lg border-2
         border-blue-400 bg-slate-300 p-2 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            updateDisplayName();
            setIsClicked(false);
          }}
        >
          <input
            type="text"
            className="inputElement"
            name="name"
            maxLength={16}
            value={registerInput.name}
            placeholder="Enter your name"
            onChange={registerOnChange}
          />

          <button className="submitButton px-6">Get In</button>
        </form>
      )}
    </>
  );
};
