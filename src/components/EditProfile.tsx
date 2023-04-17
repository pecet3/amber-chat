import React from "react";
import { updateProfile, User } from "firebase/auth";
import { auth } from "../firebase-config";
export const EditProfile = () => {
  const [user, setUser] = React.useState({
    name: "",
  });
  const updateData = async () => {
    try {
      updateProfile(auth.currentUser as User, {
        displayName: !!user.name ? user.name : auth.currentUser?.displayName,
      });
    } catch (err) {
      alert(err);
    }
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user.name);
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
          value={user.name}
          placeholder="Enter new name..."
        />
        <button className="submitButton">Update your profile!</button>
      </form>
    </section>
  );
};
