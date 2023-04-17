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

    if (!auth.currentUser) return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName || anonymousUser,
      photo:
        auth.currentUser.photoURL ||
        "https://xsgames.co/randomusers/avatar.php?g=pixel",
      email: auth.currentUser.email || "",
      date: new Date().toLocaleDateString(undefined, {
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
      <header className="m-auto flex justify-around ">
        <h1 id="test" className="my-6 text-2xl text-blue-400 lg:text-4xl">
          Welcome to {room}
        </h1>
        <LogOutButton />
      </header>
      <main>
        <div className="m-auto h-[700px] max-w-3xl overflow-y-scroll rounded-2xl py-2">
          {messages.map((message) => (
            <div
              key={nanoid()}
              className={`my-2 flex items-end justify-between gap-4 rounded-2xl p-2 shadow-lg ${
                message.user === auth.currentUser?.displayName ||
                message.user === anonymousUser
                  ? "flex-row-reverse bg-blue-300 "
                  : "bg-blue-200"
              }`}
            >
              <div className="m-auto flex basis-2/12 flex-col items-center self-start align-top font-serif text-sm text-slate-700">
                <img
                  src={message.photo ? message.photo : ""}
                  className="h-10 w-10 rounded-full object-fill shadow-xl md:h-14 md:w-14"
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
          onSubmit={handleSubmit}
          className="m-auto my-4 flex max-w-3xl p-2"
        >
          <input
            placeholder="Type your message..."
            onChange={handleInputChange}
            value={newMessage}
            autoFocus={true}
            ref={inputRef}
            className="mr-2 max-w-3xl basis-10/12 rounded-md border-2 p-3"
          />
          <button
            type="submit"
            name="submitButton"
            className="submitButton m-0 basis-2/12 px-4 "
          >
            Send
          </button>
        </form>
      </main>
    </>
  );
};
