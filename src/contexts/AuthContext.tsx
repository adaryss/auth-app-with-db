import React, {
	FC,
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";
import { auth } from "src/utils/auth/firebaseClient";
import firebase from "firebase/compat/app";
import { parseCookies, setCookie, destroyCookie } from "nookies";

type User = firebase.User | null;
type HandleAuthFunc = (
	email: string,
	password: string
) => Promise<firebase.auth.UserCredential>;
type LogoutFunc = () => Promise<void>;
type ResetPasswordFunc = (email: string) => Promise<void>;

interface AuthContextI {
	readonly user: User;
	readonly handleRegister: HandleAuthFunc;
	readonly handleLogin: HandleAuthFunc;
	readonly handleLogout: LogoutFunc;
	readonly handleResetPassword: ResetPasswordFunc;
}

const AuthContext = createContext({} as AuthContextI);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User>(null);

	const handleRegister = (email: string, password: string) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};
	const handleLogin = (email: string, password: string) => {
		return auth.signInWithEmailAndPassword(email, password);
	};
	const handleLogout = () => {
		return auth.signOut();
	};
	const handleResetPassword = (email: string) => {
		return auth.sendPasswordResetEmail(email);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				setCookie(null, "refreshToken", user.refreshToken);
			}
			if (!user) {
				setUser(null);
				const refreshToken = parseCookies()["refreshToken"];
				if (refreshToken) {
					destroyCookie(null, "refreshToken");
				}
			}
		});

		return unsubscribe;
	}, []);

	const contextValue: AuthContextI = {
		user,
		handleRegister,
		handleLogin,
		handleLogout,
		handleResetPassword,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
