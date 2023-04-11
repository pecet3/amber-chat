import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface IAuth {
  setAuthTrue: React.Dispatch<React.SetStateAction<Boolean>>;
}
export const Auth: React.FC<IAuth> = ({ setAuthTrue }) => {
  const signGoogleHandle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setAuthTrue((prev) => (prev = true));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="my-20">
      <p>Welcome to...</p>
      <h1 className="mb-10 text-4xl">JakubChat</h1>
      <button
        onClick={() => signGoogleHandle()}
        className="rounded-md border-2 p-2"
      >
        Sign in With Google
      </button>
    </div>
  );
};
