import { useState } from "react";
import { Auth } from "./components/Auth";
import "./App.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

type TAuth = Cookies;
function App() {
  const [isAuth, setIsAuth] = useState<TAuth>(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

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
          <input></input>
          <button>EnterChat</button>
        </div>
      )}
    </div>
  );
}

export default App;
