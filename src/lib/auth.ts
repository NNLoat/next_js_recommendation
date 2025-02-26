import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User, getIdToken } from "firebase/auth";
import { auth } from "./firebase";
import Cookies from "js-cookie";

// Function to sign in user
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // return userCredential.user;
    if (user) {
      const token = await getIdToken(user);
      Cookies.set("token", token, { expires: 1, path: "/" }); // Set token in cookies for 1 day
    }
    return user;
  } catch (error: unknown) {
    if (error instanceof Error){
        throw new Error(error.message);
    }
  }
};

// Function to sign out user
export const logout = async () => {
  await signOut(auth);
  Cookies.remove("token"); // Remove token when user logs out
};

// Function to observe authentication state
export const authStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await getIdToken(user);
      Cookies.set("token", token, { expires: 1, path: "/" });
    } else {
      Cookies.remove("token");
    }
    callback(user);
  });
};
