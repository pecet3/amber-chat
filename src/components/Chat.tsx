import { useState, useEffect } from "react";
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

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
    onSnapshot(queryMessages, (snapshot) => {
      console.log("newMessage");
    });
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser ? auth.currentUser.displayName : "",
      room,
    });

    setNewMessage;
  };
  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setNewMessage(event.currentTarget.value);
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type your message..."
          onChange={handleInputChange}
          value={newMessage}
          className="rounded-md border-2 p-2"
        />
        <button type="submit" className="submitButton">
          Send
        </button>
      </form>
    </div>
  );
};
