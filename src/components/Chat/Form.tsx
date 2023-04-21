import { useState, useRef, useContext, useEffect } from "react";
import Context, { TContext } from "../../ChatContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, listAll } from "firebase/storage";
import { auth, db, storage } from "../../firebase-config";
import { nanoid } from "nanoid";
export interface IForm {}
export const Form: React.FC<IForm> = () => {
  const [newMessage, setNewMessage] = useState("");
  const [upload, setUpload] = useState<File | null>(null);
  const { anonymousUser, room } = useContext(Context) as TContext;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = collection(db, "messages");

  const imageListRef = ref(storage, `images/${upload?.name}`);

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

  const handleUploadChange = (event: React.FormEvent): void => {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      setUpload(inputElement.files[0]);
    }
  };
  const uploadImage = () => {
    if (upload == null) return;
    const imageRef = ref(storage, `images/${upload.name + nanoid()}`);
    uploadBytes(imageRef, upload).then(() => {
      alert("successfully uploaded");
    });
  };

  useEffect(() => {
    listAll(imageListRef);
  }, []);
  return (
    <>
      <div className="m-auto flex max-w-3xl items-center justify-around rounded-t-lg bg-stone-300 ">
        <input type="file" onChange={handleUploadChange} />
        <button onClick={uploadImage} className="submitButton">
          Upload
        </button>
      </div>
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
