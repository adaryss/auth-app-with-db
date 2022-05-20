import { auth } from "src/utils/auth/firebaseAuth";
import firebase from "firebase/compat/app";

export const authRegister = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
	return auth.createUserWithEmailAndPassword(email, password);
};

export const authLogin = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
	return auth.signInWithEmailAndPassword(email, password);
};

export const handleLogout = (): Promise<void> => {
	return auth.signOut();
};

export const handleResetPassword = (email: string): Promise<void> => {
	return auth.sendPasswordResetEmail(email);
};