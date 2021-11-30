import { auth } from "src/utils/auth/firebaseAuth";
import firebase from "firebase/compat/app";

type HandleAuthFunc = (
	email: string,
	password: string
) => Promise<firebase.auth.UserCredential>;

export const authRegister: HandleAuthFunc = async (email: string, password: string) => {
	return auth.createUserWithEmailAndPassword(email, password);
};

export const authLogin = async (email: string, password: string) => {
	return auth.signInWithEmailAndPassword(email, password);
};

export const handleLogout = () => {
	return auth.signOut();
};

export const handleResetPassword = (email: string) => {
	return auth.sendPasswordResetEmail(email);
};