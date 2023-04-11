import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
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
    },
  ]);
  const buttonRef = useRef<HTMLInputElement>(null);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
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
        {messages.map((message) => (
          <div
            key={nanoid()}
            className="my-2 flex w-[460px] items-center justify-between gap-8 rounded-md border-2 bg-slate-50 p-2 md:w-[660px]"
          >
            <p className="w-32 justify-items-start font-serif text-slate-700">
              {message.user !== "" && message.user}:
            </p>
            <p className="m-0 w-96 grow break-all px-8 text-right text-lg">
              {message.text !== "" && message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Type your message..."
            onChange={handleInputChange}
            value={newMessage}
            ref={buttonRef}
            className="rounded-md border-2 p-2 "
          />
          <button type="submit" name="submitButton" className="submitButton">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
