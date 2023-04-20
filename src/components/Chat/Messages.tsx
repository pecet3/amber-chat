import { useState, useEffect, useContext } from "react";
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

export interface IMessages {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}
export const Messages: React.FC<IMessages> = ({ scrollRef }) => {
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
  const { anonymousUser, room } = useContext(Context) as TContext;
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

  return (
    <div className="m-auto flex max-h-[800px] max-w-3xl flex-col gap-2 overflow-y-scroll rounded-2xl">
      {messages.map((message) => (
        <div
          key={nanoid()}
          className={` flex items-end justify-between gap-4 rounded-2xl p-2 shadow-md shadow-gray-400 ${
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
      <div ref={scrollRef} className="mt-20"></div>
    </div>
  );
};
