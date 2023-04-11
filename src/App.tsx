import { useState, useRef, useEffect } from "react";
import { Auth } from "./components/Auth";
import "./App.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(!!cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const roomInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => console.log(isAuth), [isAuth]);
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setAuthTrue={() => setIsAuth(true)} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <div>Chat</div>
      ) : (
        <div>
          <label>Enter Room Name:</label>
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
