import React from "react";
import { LogOutButton } from "../../common/LogOutButton";
import { BiSortDown } from "react-icons/bi";
import Context, { TContext } from "../../ChatContext";
export interface IHeader {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}
export const ChatHeader: React.FC<IHeader> = ({ scrollRef }) => {
  const { room } = React.useContext(Context) as TContext;
  return (
    <header
      className="sticky top-0 z-10 m-auto flex max-w-[780px]
      items-center justify-between gap-1 rounded-lg bg-stone-300 p-1 shadow-xl md:flex-row"
    >
      <h1 id="test" className="ml-2 text-lg text-purple-600 md:text-2xl">
        {room}
      </h1>
      <span className="flex gap-1">
        <button
          onClick={() =>
            scrollRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="submitButton flex text-sm"
        >
          <BiSortDown size="24" />
          <p>Scroll Down</p>
        </button>
        <LogOutButton />
      </span>
    </header>
  );
};
