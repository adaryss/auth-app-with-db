import Layout from "src/components/Layout";
import React from "react";
import {
	Flex,
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
} from "@chakra-ui/react";

const Login = () => {
	return (
		<Layout>
			<Flex width="full" align="center" justifyContent="center">
				<Box p={2}>
					<Box textAlign="center">
						<Heading>Login</Heading>
					</Box>
					<Box my={4} textAlign="left">
						<form>
							<FormControl>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									placeholder="your@email.com"
								/>
							</FormControl>
							<FormControl mt={6}>
								<FormLabel>Password</FormLabel>
								<Input type="password" placeholder="••••••" />
							</FormControl>
							<Button width="full" mt={4} type="submit">
								Login
							</Button>
						</form>
					</Box>
				</Box>
			</Flex>
		</Layout>
	);
};

export default Login;
