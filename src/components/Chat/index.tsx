import { useState, useEffect, useRef, useContext } from "react";
import Context, { TContext } from "../../ChatContext";
import { nanoid } from "nanoid";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";

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
