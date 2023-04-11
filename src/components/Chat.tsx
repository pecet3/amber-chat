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
    },
  ]);
  const buttonRef = useRef<HTMLInputElement>(null);

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
      <div className="flex flex-col items-center">
        <h1 className="my-6 text-4xl text-stone-300">Welcome to {room}</h1>
        {messages.map((message) => (
          <div
            key={nanoid()}
            className="my-2 flex w-[460px] items-center justify-between rounded-md border-2 bg-slate-200 p-2 md:w-[660px]"
          >
            <p className="w-32 font-serif text-slate-700">
              <img src={message.photo} className="h-14 w-auto rounded-full" />
              {message.user !== "" && message.user}:
            </p>
            <p className="m-0 w-96 grow break-all px-8 text-left text-lg">
              {message.text !== "" && message.text}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="my-4">
        <input
          placeholder="Type your message..."
          onChange={handleInputChange}
          value={newMessage}
          ref={buttonRef}
          className="mr-2 w-[400px] rounded-md border-2 p-2 md:w-[585px]"
        />
        <button
          type="submit"
          name="submitButton"
          className="submitButton m-0 px-4"
        >
          Send
        </button>
      </form>
    </>
  );
};
