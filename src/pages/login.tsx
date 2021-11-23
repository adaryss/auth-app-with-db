import React, { useState } from "react";
import Layout from "src/components/Layout";
import {
	Flex,
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	Alert,
	AlertIcon,
	AlertTitle,
	Link as ChakraLink,
	Center,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAuth } from "src/contexts/AuthContext";
import { useRouter } from "next/router";
import firebase from "firebase/compat/app";
import Link from "next/link";

const Login = () => {
	const [loginError, setLoginError] = useState<string | null>(null);
	const [passwordResetError, setPasswordResetError] = useState<string | null>(
		null
	);
	const [login, setLogin] = useState(false);
	const [resetting, setResetting] = useState(false);
	const [showResetPassword, setShowResetPassword] = useState(false);
	const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");
	const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const emailResetRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const {
		handleLogin: handleLoginUser,
		handleResetPassword: handleResetUserPassword,
	} = useAuth();
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent<Element>) => {
		e.preventDefault();
		setLoginError(null);

		try {
			setLogin(true);
			await handleLoginUser(
				emailRef.current.value,
				passwordRef.current.value
			);
			router.push("/");
		} catch (error) {
			const authError = error as firebase.auth.Error;
			setLoginError(authError.message.split(":")[1]);
		} finally {
			setLogin(false);
		}
	};

	const handleResetPassword = async (e: React.FormEvent<Element>) => {
		e.preventDefault();
		setPasswordResetError(null);
		setResetPasswordSuccess("");

		try {
			setResetting(true);
			await handleResetUserPassword(emailResetRef.current.value);
			setResetPasswordSuccess("Check your email for more information");
			emailResetRef.current.value = '';
		} catch (error) {
			const authError = error as firebase.auth.Error;
			setPasswordResetError(authError.message.split(":")[1]);
		} finally {
			setResetting(false);
		}
	};

	return (
		<Layout>
			{showResetPassword ? (
				<Flex width="50vw" align="center" justifyContent="center">
					<Box p={2}>
						<Box textAlign="center">
							<Heading>Reset password</Heading>
						</Box>
						<form onSubmit={handleResetPassword}>
							<Box my={4} textAlign="left">
								{passwordResetError && (
									<Alert status="error">
										<AlertIcon />
										<AlertTitle>
											{passwordResetError}
										</AlertTitle>
									</Alert>
								)}
								{resetPasswordSuccess && (
									<Alert status="success">
										<AlertIcon />
										<AlertTitle>
											{resetPasswordSuccess}
										</AlertTitle>
									</Alert>
								)}
								<FormControl as="fieldset">
									<FormControl>
										<FormLabel>Email</FormLabel>
										<Input
											ref={emailResetRef}
											type="email"
											placeholder="your@email.com"
											isRequired
										/>
									</FormControl>

									<Button
										type="submit"
										width="full"
										mt={4}
										isDisabled={resetting}
									>
										Reset password
									</Button>
								</FormControl>
							</Box>
						</form>
						<Box mt={4}>
							<Center>
								<ChakraLink
									onClick={() => setShowResetPassword(false)}
								>
									Back to login
								</ChakraLink>
							</Center>
						</Box>
					</Box>
				</Flex>
			) : (
				<Flex width="50vw" align="center" justifyContent="center">
					<Box p={2}>
						<Box textAlign="center">
							<Heading>Login</Heading>
						</Box>
						<form onSubmit={handleLogin}>
							<Box my={4} textAlign="left">
								{loginError && (
									<Alert status="error">
										<AlertIcon />
										<AlertTitle>{loginError}</AlertTitle>
									</Alert>
								)}
								<FormControl as="fieldset">
									<FormControl>
										<FormLabel>Email</FormLabel>
										<Input
											ref={emailRef}
											type="email"
											placeholder="your@email.com"
											isRequired
										/>
									</FormControl>
									<FormControl mt={6}>
										<FormLabel>Password</FormLabel>
										<Input
											ref={passwordRef}
											type="password"
											placeholder="••••••"
											isRequired
										/>
									</FormControl>
									<Button
										type="submit"
										width="full"
										mt={4}
										isDisabled={login}
									>
										Login
									</Button>
								</FormControl>
							</Box>
						</form>
						<Box>
							Need an account?{" "}
							<Link href="/register">
								<ChakraLink>Register here</ChakraLink>
							</Link>
						</Box>
						<Box mt={4}>
							<Center>
								<ChakraLink
									onClick={() => setShowResetPassword(true)}
								>
									Forgot password?
								</ChakraLink>
							</Center>
						</Box>
					</Box>
				</Flex>
			)}
		</Layout>
	);
};

export default Login;
