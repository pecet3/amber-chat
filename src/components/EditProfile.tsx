import React from "react";
import { updateProfile, User } from "firebase/auth";
import { auth } from "../firebase-config";
import Context, { TContext } from "../ChatContext";
import { useGetAvatar } from "./useGetAvatar";
import { HiRefresh } from "react-icons/hi";
export const EditProfile = () => {
  const [inputUser, setInputUser] = React.useState({
    name: "",
  });
  const { user, setUser } = React.useContext(Context) as TContext;
  const { avatar, getAvatar } = useGetAvatar();

  const updateData = async () => {
    try {
      updateProfile(auth.currentUser as User, {
        displayName: !!inputUser.name
          ? inputUser.name
          : auth.currentUser?.displayName,
        photoURL:
          avatar.message !== "" ? avatar.message : auth.currentUser?.photoURL,
      });
    } catch (err) {
      alert(err);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };

  // React.useEffect(() => {
  //   if (auth.currentUser) {
  //     setUser(auth.currentUser);
  //   }
  // }, []);

  return (
    <section className="my-10">
      <h2 className="m-0 text-xl">Edit Your Profile</h2>
      <form
        className="form mb-2 mt-1"
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
          placeholder="Change your name..."
        />
        <div className="flex flex-col rounded-lg border-2 border-teal-500 bg-slate-200 p-2">
          {!!avatar.message ? (
            <img
              src={avatar.message}
              alt="avatar"
              className="h-32 w-auto rounded-xl"
            />
          ) : (
            <p>Change your avatar</p>
          )}

          <button
            className="submitButton align-center m-auto mt-2 flex justify-center gap-1"
            onClick={() => getAvatar()}
          >
            <HiRefresh size="16" />
            <p className="text-xs">New avatar</p>
          </button>
        </div>
        <button className="submitButton bg-teal-500">
          Update your profile!
        </button>
      </form>
    </section>
  );
};
