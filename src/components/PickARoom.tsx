import React from "react";
import Context, { TContext } from "../ChatContext";

const PickARoom = () => {
  const [selectValue, setSelectValue] = React.useState("#room1");
  const { setRoom, room } = React.useContext(Context) as TContext;
  const onFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="my-64">
      <h1 className="mb-12 text-4xl">Pick a ChatRoom</h1>
      <form onSubmit={onFormChange}>
        <select
          name="select-room"
          className="rounded-md px-4 py-2 shadow-lg"
          autoFocus={true}
          value={selectValue}
          onChange={(e) => setSelectValue(e.currentTarget.value)}
        >
          <option value="#room1">#room 1</option>
          <option value="#dev">#dev</option>
        </select>
        <button
          className="submitButton px-6 shadow-lg"
          onClick={() => {
            setRoom(selectValue);
            console.log(room);
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default PickARoom;
