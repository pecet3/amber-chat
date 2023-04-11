import { useState, useRef, useEffect } from "react";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import "./App.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(!!cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const roomInputRef = useRef<HTMLInputElement>(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setAuthTrue={() => setIsAuth(true)} />
      </div>
    );
  }
  return (
    <div className="my-64">
      {room ? (
        <Chat room={room} />
      ) : (
        <div>
          <input
            ref={roomInputRef}
            className="rounded-md border-2 p-2"
            placeholder="Enter room name..."
          ></input>
          <button
            className="submitButton"
            onClick={() =>
              null !== roomInputRef.current &&
              setRoom(roomInputRef.current.value)
            }
          >
            EnterChat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
