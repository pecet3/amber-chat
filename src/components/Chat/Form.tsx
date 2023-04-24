import { useState, useRef, useContext, useEffect } from "react";
import Context, { TContext } from "../../ChatContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
export interface IForm {}
export const Form: React.FC<IForm> = () => {
  const [newMessage, setNewMessage] = useState("");

  const { anonymousUser, room } = useContext(Context) as TContext;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = collection(db, "messages");

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

    setNewMessage((prev) => (prev = ""));
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  };
  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setNewMessage(event.currentTarget.value);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="sticky z-10 m-auto flex
          max-w-[780px] gap-2 rounded-md bg-stone-300 p-1 shadow-xl md:p-2"
      >
        <input
          placeholder="Type your message..."
          onChange={handleInputChange}
          value={newMessage}
          autoFocus={true}
          ref={inputRef}
          className="max-w-3xl basis-9/12 rounded-md border-2 p-3"
        />
        <button
          type="submit"
          name="submitButton"
          className="submitButton m-0 basis-3/12 bg-purple-600 px-0 md:px-2 lg:px-4"
        >
          Send
        </button>
      </form>
    </>
  );
};
