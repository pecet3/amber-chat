import React from "react";
import { signInAnonymously, updateProfile, User } from "firebase/auth";
import { auth } from "../../firebase-config";
import Cookies from "universal-cookie";
import Context, { TContext } from "../../ChatContext";

const cookies = new Cookies();
export const Anonymous: React.FC = () => {
  const [nameInput, setNameInput] = React.useState("");
  const { setIsAuth, setStatus } = React.useContext(Context) as TContext;

  const getIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      updateProfile(auth.currentUser as User, {
        displayName: nameInput,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        className="flex justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (nameInput.length < 3)
            return setStatus(
              (prev) =>
                (prev = {
                  status: prev.status,
                  message: "Name must be at least 3 characters",
                })
            );
          getIn();
        }}
      >
        <input
          type="text"
          name="name"
          className="inputElement"
          placeholder="Enter your name..."
          value={nameInput}
          autoFocus={true}
          onChange={(e) => setNameInput(([e.target.name] = e.target.value))}
        />
        <button className="submitButton bg-blue-600 md:hover:scale-105">
          Get In
        </button>
      </form>
    </>
  );
};
