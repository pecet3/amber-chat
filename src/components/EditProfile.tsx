import React from "react";
import { updateProfile, User } from "firebase/auth";
import { auth } from "../firebase-config";
export const EditProfile = () => {
  const [name, setName] = React.useState({
    name: "",
  });
  const updateDisplayName = async () => {
    try {
      updateProfile(auth.currentUser as User, {
        displayName: "test1234",
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <section className="flex">
      <form>
        <input
          type="text"
          className="inputElement"
          name="name"
          value={name.name}
        />
      </form>
    </section>
  );
};
