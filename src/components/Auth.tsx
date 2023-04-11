import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth: React.FC = () => {
  const signGoogleHandle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
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
