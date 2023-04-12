import { useState, useEffect, useRef } from "react";
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

export interface IChat {
  room: string;
}
export const Chat: React.FC<IChat> = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "",
      user: "",
      createdAt: "",
      photo: "",
      date: "",
    },
  ]);
  const buttonRef = useRef<HTMLInputElement>(null);
  const scroll = useRef<null | HTMLDivElement>(null);

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
      if (null !== scroll.current)
        scroll.current.scrollIntoView({ behavior: "smooth" });
    });
    return () => unSubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser ? auth.currentUser.displayName : "",
      photo: auth.currentUser ? auth.currentUser.photoURL : "",
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
    if (null !== buttonRef.current) buttonRef.current.focus();
  };
  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setNewMessage(event.currentTarget.value);
  };
  return (
    <>
      <h1 id="test" className="my-6 text-2xl text-blue-400 lg:text-4xl ">
        Welcome to {room}
      </h1>
      <div className="m-auto h-[700px] max-w-3xl overflow-y-scroll p-2 py-6">
        {messages.map((message) => (
          <>
            <div
              key={nanoid()}
              className="my-2 flex items-end justify-between gap-1 rounded-2xl bg-blue-200 p-2 shadow-xl "
            >
              <p className="w-32 basis-1/6 font-serif text-slate-700">
                <img
                  src={message.photo}
                  className="h-14 w-auto rounded-full shadow-xl"
                />
                {message.user !== "" && message.user}:
              </p>
              <p className="m-0 basis-3/4 break-all text-left text-lg">
                {message.text !== "" && message.text}
              </p>
              <p className="m-0 basis-1/6 self-start text-xs">
                {message.date !== "" && message.date}
              </p>
            </div>
            <div ref={scroll}></div>
          </>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="m-auto my-4 flex max-w-3xl p-2">
        <input
          placeholder="Type your message..."
          onChange={handleInputChange}
          value={newMessage}
          ref={buttonRef}
          className="mr-2 max-w-3xl basis-10/12 rounded-md border-2 p-3"
          autoFocus={true}
        />
        <button
          type="submit"
          name="submitButton"
          className="submitButton m-0 basis-2/12 px-4 "
        >
          Send
        </button>
      </form>
    </>
  );
};
