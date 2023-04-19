import { useContext } from "react";
import { Auth } from "./components/Auth/index";
import { Chat } from "./components/Chat/index";
import "./App.css";
import PickARoom from "./components/PickARoom";
import Context, { TContext } from "./ChatContext";

function App() {
  document.documentElement.setAttribute("class", "bg-gray-200");
  const { isAuth, room } = useContext(Context) as TContext;

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
          <p className="mt-2 text-xs text-slate-400">v0.7 beta</p>
        </footer>
      </>
    );
  }
  return <>{room ? <Chat /> : <PickARoom />}</>;
}

export default App;
