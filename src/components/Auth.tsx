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
    <div>
      <p>Sign In With Google Continue</p>
      <button onClick={() => signGoogleHandle()}>Sign in With Google</button>
    </div>
  );
};
