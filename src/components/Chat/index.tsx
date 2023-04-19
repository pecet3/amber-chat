import { useRef } from "react";
import { ChatHeader } from "./ChatHeader";
import { Form } from "./Form";
import { Messages } from "./Messages";

export interface IChat {}
export const Chat: React.FC<IChat> = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <ChatHeader scrollRef={scrollRef} />
      <main className=" bg-slate-200 dark:bg-slate-800">
        <Messages scrollRef={scrollRef} />
        <Form />
      </main>
    </>
  );
};
