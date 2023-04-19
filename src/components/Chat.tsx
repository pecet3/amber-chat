import { useState, useEffect, useRef, useContext } from "react";
import Context, { TContext } from "../ChatContext";
import { nanoid } from "nanoid";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { LogOutButton } from "../common/LogOutButton";
import { BiSortDown } from "react-icons/bi";

import { motion } from "framer-motion";
export interface IChat {
  room: string;
}
export const Chat: React.FC<IChat> = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "",
      user: "unknown",
      createdAt: "",
      photo: "",
      date: "",
      email: "",
    },
  ]);
  const { anonymousUser } = useContext(Context) as TContext;
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unSubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: Array<any> = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unSubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage === "") return;
    if (newMessage.trim() === "") return;
    if (!auth.currentUser) return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName || anonymousUser,
      photo:
        auth.currentUser.photoURL ||
        "https://xsgames.co/randomusers/avatar.php?g=pixel",
      email: auth.currentUser.email || "",
      date: new Date().toLocaleDateString("en-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
      room,
    });

    setNewMessage("");
    inputRef.current?.focus();
  };
  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setNewMessage(event.currentTarget.value);
  };
  return (
    <>
      <header
        className="sticky top-0 z-10 m-auto flex max-w-3xl flex-row-reverse 
      items-center justify-between gap-1 rounded-lg bg-stone-300 p-1 md:flex-row"
      >
        <h1 id="test" className="hidden text-2xl text-blue-400 md:flex">
          {room}
        </h1>
        <span className="flex gap-1">
          <button
            onClick={() =>
              scrollRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="submitButton flex"
          >
            <BiSortDown size="24" />
            <p>Srcoll Down</p>
          </button>
          <LogOutButton />
        </span>
      </header>
      <main className="bg-slate-400">
        <div className="m-auto flex  max-w-3xl flex-col gap-2 rounded-2xl py-2">
          {messages.map((message) => (
            <div
              key={nanoid()}
              className={` flex items-end justify-between gap-4 rounded-2xl p-2 shadow-sm shadow-blue-400 ${
                message.user === auth.currentUser?.displayName ||
                message.user === anonymousUser
                  ? "flex-row-reverse bg-blue-300 "
                  : "bg-blue-200"
              }`}
            >
              <div className="m-auto flex basis-2/12 flex-col items-center self-start align-top font-serif text-sm text-slate-700">
                <img
                  src={message.photo ? message.photo : ""}
                  className="h-10 w-10 rounded-full object-fill shadow-xl lg:h-14 lg:w-14"
                />
                {message.user ? message.user : message.email}
              </div>
              <p
                className={`basis-8/12 break-before-right self-center text-sm md:text-lg ${
                  message.user === auth.currentUser?.displayName ||
                  message.user === anonymousUser
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {message.text !== "" && message.text}
              </p>
              <p className="m-0 basis-2/12 self-end text-xs">
                {message.date !== "" && message.date}
              </p>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="sticky bottom-0 z-50 m-auto flex max-w-[780px] gap-2 rounded-md bg-stone-300 p-1 md:p-2"
        >
          <input
            placeholder="Type your message..."
            onChange={handleInputChange}
            value={newMessage}
            autoFocus={true}
            ref={inputRef}
            className="max-w-3xl basis-10/12 rounded-md border-2 p-3"
          />
          <button
            type="submit"
            name="submitButton"
            className="submitButton m-0 basis-2/12 bg-purple-600 px-4"
          >
            Send
          </button>
        </form>
      </main>
    </>
  );
};
