import React from "react";
import { updateProfile, User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import Context, { TContext } from "../ChatContext";
export const EditProfile = () => {
  const [inputUser, setinputUser] = React.useState({
    name: "",
  });
  const { user, setUser } = React.useContext(Context) as TContext;

  const updateData = async () => {
    try {
      updateProfile(auth.currentUser as User, {
        displayName: !!inputUser.name
          ? inputUser.name
          : auth.currentUser?.displayName,
      });
    } catch (err) {
      alert(err);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setinputUser({ ...inputUser, [e.target.name]: e.target.value });
    console.log(inputUser.name);
  };

  return (
    <section>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          updateData();
        }}
      >
        <input
          type="text"
          className="inputElement"
          name="name"
          onChange={onChange}
          value={inputUser.name}
          placeholder="Enter new name..."
        />
        <button className="submitButton">Update your profile!</button>
      </form>
    </section>
  );
};
