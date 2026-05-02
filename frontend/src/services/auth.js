import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// email + password
export const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signupWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// google sign in
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

// user logout
export const logout = () => {
    return signOut(auth);
};

// token
export const getToken = (force = false) => {
    const user = auth.currentUser;
    if (!user) return Promise.resolve(null);
    return user.getIdToken(force);
};
