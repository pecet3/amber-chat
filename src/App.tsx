import { useState, useRef } from "react";
import { Auth } from "./components/Auth";
import "./App.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

type TAuth = Cookies;
function App() {
  const [isAuth, setIsAuth] = useState<TAuth>(cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const roomInputRef = useRef<HTMLInputElement>(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <div>Chat</div>
      ) : (
        <div>
          <label>Enter Room Name</label>
          <input ref={roomInputRef}></input>
          <button
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
