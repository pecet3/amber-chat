import { useState, useRef, useEffect, useContext } from "react";
import { Auth } from "./components/Auth/index";
import { Chat } from "./components/Chat";
import "./App.css";
import Cookies from "universal-cookie";
import PickARoom from "./components/PickARoom";
import Context, { TContext } from "./ChatContext";
const cookies = new Cookies();

function App() {
  document.documentElement.setAttribute("class", "bg-gray-200");
  const { isAuth, setIsAuth, room } = useContext(Context) as TContext;

  if (!isAuth) {
    return (
      <>
        <Auth />
        <footer className="my-24">
          <p className="text-slate-500">Developed with ❤ by Jakub Pacewicz</p>
          <p className="text-slate-400">
            <a
              href="https://github.com/pecet3"
              rel="noopener noreferrer"
              target="_blank"
            >
              Link to my GitHub
            </a>
          </p>
        </footer>
      </>
    );
  }
  return <>{room ? <Chat room={room} /> : <PickARoom />}</>;
}

export default App;
