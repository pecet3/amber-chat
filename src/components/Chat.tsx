import { useState, useEffect, useRef } from "react";
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
  const [messages, setMessages] = useState([]);
  const buttonRef = useRef<HTMLInputElement>(null);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
    });
    setMessages(messages);
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
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type your message..."
          onChange={handleInputChange}
          value={newMessage}
          ref={buttonRef}
          className="rounded-md border-2 p-2"
        />
        <button type="submit" name="submitButton" className="submitButton">
          Send
        </button>
      </form>
    </div>
  );
};
