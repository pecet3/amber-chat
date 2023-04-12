import { useState, useRef, useEffect } from "react";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import "./App.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(!!cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const [selectValue, setSelectValue] = useState("#room1");
  document.documentElement.setAttribute("class", "bg-gray-200");

  const onFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setAuthTrue={() => setIsAuth(true)} />
      </div>
    );
  }
  return (
    <div className="">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="my-64">
          <h1 className="mb-12 text-4xl">Pick a ChatRoom</h1>
          <form onSubmit={onFormChange}>
            <select
              name="select-room"
              className="rounded-md px-4 py-2 shadow-lg"
              autoFocus={true}
              value={selectValue}
              onChange={(e) => setSelectValue(e.currentTarget.value)}
            >
              <option value="#room1">#room 1</option>
              <option value="#dev">#dev</option>
            </select>
            <button
              className="submitButton px-6 shadow-lg"
              onClick={() => setRoom(selectValue)}
            >
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
