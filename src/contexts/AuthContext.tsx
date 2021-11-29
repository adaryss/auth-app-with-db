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
import { AUTH_USER_ID, REFRESH_TOKEN } from "src/contants/cookies";
import { createUser } from "src/utils/api/createUser";
import {
	authLogin,
	authRegister,
	handleLogout,
	handleResetPassword,
} from "src/utils/auth/authMethods";
import { useGetCurrentUserData } from "src/hooks/useGetCurrentUserData";
import { UserRole } from "src/contants/user";
import {User as UserData} from '@prisma/client'

type User = firebase.User | null;
type HandleAuthFunc = (
	email: string,
	password: string,
	role: UserRole,
) => Promise<any>;
type LogoutFunc = () => Promise<void>;
type ResetPasswordFunc = (email: string) => Promise<void>;

interface AuthContextI {
	readonly user: User;
	readonly handleRegister: HandleAuthFunc;
	readonly handleLogin: HandleAuthFunc;
	readonly handleLogout: LogoutFunc;
	readonly handleResetPassword: ResetPasswordFunc;
	readonly userData: {
		data?: UserData | null | {},
		error?: any,
		isLoading: boolean,
	};
}

const AuthContext = createContext({} as AuthContextI);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User>(null);
	const [hasUserLoaded, setHasUserLoaded] = useState(false);

	const handleRegister = async (
		email: string,
		password: string,
		role: UserRole = UserRole.USER
	) => {
		try {
			const registerResponse = await authRegister(email, password);
			await createUser({
				authUid: registerResponse.user?.uid,
				email: registerResponse.user?.email,
				role,
			});
		} catch (e) {
			if (e instanceof Error) {
				console.warn("Error", e.message);
			}
			throw e;
		}
	};
	const handleLogin = async (email: string, password: string) => {
		try {
			await authLogin(email, password);
		} catch (e) {
			if (e instanceof Error) {
				console.warn("Error", e.message);
			}
			throw e;
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				setCookie(null, REFRESH_TOKEN, user.refreshToken);
				setCookie(null, AUTH_USER_ID, user.uid);
			}
			if (!user) {
				setUser(null);
				const refreshToken = parseCookies()[REFRESH_TOKEN];
				const authUserId = parseCookies()[AUTH_USER_ID];
				if (refreshToken) {
					destroyCookie(null, REFRESH_TOKEN);
				}
				if (authUserId) {
					destroyCookie(null, AUTH_USER_ID);
				}
			}

			setHasUserLoaded(true);
		});

		return unsubscribe;
	}, []);

	const userData = useGetCurrentUserData(user?.uid);

	const contextValue: AuthContextI = {
		user,
		userData,
		handleRegister,
		handleLogin,
		handleLogout,
		handleResetPassword,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{hasUserLoaded && children}
		</AuthContext.Provider>
	);
};
