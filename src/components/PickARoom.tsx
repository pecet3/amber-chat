import React from "react";
import Context, { TContext } from "../ChatContext";
import { LogOutButton } from "../common/LogOutButton";
import { EditProfile } from "./EditProfile";

const PickARoom = () => {
  const [selectValue, setSelectValue] = React.useState("#room1");
  const { setRoom, user } = React.useContext(Context) as TContext;
  const onFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="my-12">
      <h1 className="mb-12 text-4xl">Pick a ChatRoom</h1>
      <h2 className="my-4 text-2xl font-bold  text-red-700">
        Prosimy nie przeklinać!!!!
      </h2>
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
          className="submitButton bg-blue-600 px-6 shadow-lg md:hover:scale-105"
          onClick={() => setRoom(selectValue)}
        >
          Enter
        </button>
      </form>

      <EditProfile />
      <LogOutButton />
      {/* <button onClick={() => console.log(user)}>user</button> */}
    </div>
  );
};

export default PickARoom;
