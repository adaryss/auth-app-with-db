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
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAuth } from "src/contexts/AuthContext";
import { useRouter } from "next/router";
import firebase from "firebase/compat/app";
import Link from "next/link";

const Register = () => {
	const [registerError, setRegisterError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState("");
	const [registering, setRegistering] = useState(false);
	const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const passwordConfirmRef =
		useRef() as React.MutableRefObject<HTMLInputElement>;
	const { handleRegister: handleRegisterUser } = useAuth();
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent<Element>) => {
		e.preventDefault();
		setPasswordError("");
		setRegisterError(null);

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setPasswordError(`Passwords don't match!`);
		}

		try {
			setRegistering(true);
			await handleRegisterUser(
				emailRef.current.value,
				passwordRef.current.value
			);
			router.push("/");
		} catch (error) {
			const authError = error as firebase.auth.Error;
			setRegisterError(authError.message.split(":")[1]);
		} finally {
			setRegistering(false);
		}
	};

	return (
		<Layout>
			<Flex width="full" align="center" justifyContent="center">
				<Box p={2}>
					<Box textAlign="center">
						<Heading>Register</Heading>
					</Box>
					<form onSubmit={handleRegister}>
						<Box my={4} textAlign="left">
							{passwordError && (
								<Alert status="error">
									<AlertIcon />
									<AlertTitle>{passwordError}</AlertTitle>
								</Alert>
							)}
							{registerError && (
								<Alert status="error">
									<AlertIcon />
									<AlertTitle>{registerError}</AlertTitle>
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
								<FormControl mt={6}>
									<FormLabel>Password Confirmation</FormLabel>
									<Input
										ref={passwordConfirmRef}
										type="password"
										placeholder="••••••"
										isRequired
									/>
								</FormControl>
								<Button
									type="submit"
									width="full"
									mt={4}
									isDisabled={registering}
								>
									Register
								</Button>
							</FormControl>
						</Box>
					</form>
					<Box>
						Already have an account?{" "}
						<Link href="/login">
							<ChakraLink>Login here</ChakraLink>
						</Link>
					</Box>
				</Box>
			</Flex>
		</Layout>
	);
};

export default Register;
