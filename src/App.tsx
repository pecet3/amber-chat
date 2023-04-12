import { useState, useRef, useEffect, useContext } from "react";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import "./App.css";
import Cookies from "universal-cookie";
import PickARoom from "./components/PickARoom";
import Context, { ChatContextProvider, TContext } from "./ChatContext";
const cookies = new Cookies();

function App() {
  document.documentElement.setAttribute("class", "bg-gray-200");
  const { isAuth, setIsAuth, room } = useContext(Context) as TContext;

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setAuthTrue={() => setIsAuth(true)} />
      </div>
    );
  }
  return (
    <>
      <div className="">{room ? <Chat room={room} /> : <PickARoom />}</div>
    </>
  );
}

export default App;
