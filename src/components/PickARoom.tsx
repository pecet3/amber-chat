import React from "react";
import Context, { TContext } from "../ChatContext";
import { LogOutButton } from "../common/LogOutButton";
import { EditProfile } from "./EditProfile";

const PickARoom = () => {
  const [selectValue, setSelectValue] = React.useState("#room1");
  const { setRoom } = React.useContext(Context) as TContext;
  const onFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="my-64">
      <h1 className="mb-12 text-4xl">Pick a ChatRoom</h1>
      <form onSubmit={onFormChange}>
        <select
          name="select-room"
          className="rounded-md bg-slate-50 px-4 py-2 shadow-lg"
          autoFocus={true}
          value={selectValue}
          onChange={(e) => setSelectValue(e.currentTarget.value)}
        >
          <option value="#room1">#room 1</option>
          <option value="#dev">#dev</option>
        </select>
        <button
          className="submitButton px-6 shadow-lg"
          onClick={() => setRoom(selectValue)}
        >
          Enter
        </button>
      </form>
      <LogOutButton />
      <EditProfile />
    </div>
  );
};

export default PickARoom;
