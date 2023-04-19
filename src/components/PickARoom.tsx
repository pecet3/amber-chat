import React from "react";
import Context, { TContext } from "../ChatContext";
import { LogOutButton } from "../common/LogOutButton";
import { EditProfile } from "./EditProfile";

const PickARoom = () => {
  const [selectValue, setSelectValue] = React.useState("#room1");
  const { setRoom, status } = React.useContext(Context) as TContext;
  const onFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="my-12">
      <h1 className="mb-12 text-4xl">Pick a ChatRoom</h1>
      <form onSubmit={onFormChange} className="flex justify-center gap-2">
        <select
          name="select-room"
          className="rounded-md bg-slate-50 px-4 py-2 shadow-lg"
          autoFocus={true}
          value={selectValue}
          onChange={(e) => setSelectValue(e.currentTarget.value)}
        >
          <option value="#room1">#room1</option>
          <option value="#rbi">#rbi❤</option>
          <option value="#dev">#dev</option>
        </select>
        <button
          className="submitButton bg-purple-600 px-6 text-lg shadow-lg md:hover:scale-105"
          onClick={() => setRoom(selectValue)}
        >
          Enter
        </button>
      </form>
      <p className="mt-10 text-red-800 underline">
        {status.message && status.message}
      </p>

      <EditProfile />
      <LogOutButton />
      {/* <button onClick={() => console.log(user)}>user</button> */}
    </div>
  );
};

export default PickARoom;
