import React from "react";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import Cookies from "universal-cookie";
import Context, { TContext } from "../../ChatContext";
import { useGetAvatar } from "../useGetAvatar";
const cookies = new Cookies();

export const Register: React.FC = () => {
  const [registerInput, setRegisterInput] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const { setIsAuth, user, setUser, status, setStatus } = React.useContext(
    Context
  ) as TContext;
  const [isClicked, setIsClicked] = React.useState(false);
  const { avatar, getAvatar } = useGetAvatar();

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
    } catch (err: any) {
      alert(err);
      setIsClicked(false);
    }
  };

  const updateDisplayName = async () => {
    try {
      updateProfile(auth.currentUser as User, {
        displayName: registerInput.name,
        photoURL: avatar.message,
      });
      setIsAuth(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      {!isClicked ? (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              registerInput.email.length < 6 ||
              registerInput.password.length < 6
            )
              return setStatus(
                (prev) =>
                  (prev = {
                    status: prev.status,
                    message: "Password and email must be at least 6 characters",
                  })
              );

            setIsClicked(true);
            register();
            getAvatar();
          }}
        >
          <legend>Register here!</legend>
          <input
            type="text"
            className="inputElement"
            name="email"
            value={registerInput.email}
            placeholder="Enter your email"
            onChange={registerOnChange}
            required={true}
          />
          <input
            type="password"
            name="password"
            className="inputElement"
            value={registerInput.password}
            placeholder="password"
            onChange={registerOnChange}
            pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            required={true}
          />

          <button className="submitButton bg-teal-500 px-6">Register</button>
        </form>
      ) : (
        <form
          className="m-auto flex max-w-[240px] flex-col 
        items-center gap-3 rounded-lg border-2
         border-blue-400 bg-slate-300 p-2 py-4"
          onSubmit={(e) => {
            if (registerInput.name.length < 3) return;
            e.preventDefault();
            updateDisplayName();
            setIsClicked(false);
          }}
        >
          <legend>Enter your display name</legend>
          <input
            type="text"
            className="inputElement"
            name="name"
            maxLength={16}
            value={registerInput.name}
            placeholder="here..."
            onChange={registerOnChange}
          />

          <button className="submitButton px-6">Get In</button>
        </form>
      )}
    </>
  );
};
