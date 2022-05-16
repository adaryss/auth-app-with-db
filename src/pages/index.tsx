import Layout from "src/components/Layout";
import NextLink from "next/link";
import { useAuth } from "src/contexts/AuthContext";
import { FC } from "toasted-notes/node_modules/@types/react";
import { Heading, Text, Link, Box } from "@chakra-ui/react";

const Home: FC = () => {
	const { user } = useAuth();

	return (
		<Layout>
			{user ? (
				<Box textAlign="center">
					<Heading mb="4">Your todo app</Heading>
					<Text fontSize="lg">
						You can start adding your todos{" "}
						<NextLink href="/todos">
							<Link color="teal.500">here</Link>
						</NextLink>
						.
					</Text>
				</Box>
			) : (
				<Box textAlign="center">
					<Heading mb="4">Your todo app</Heading>
					<Text fontSize="lg">
						{" "}
						For start saving todos, please{" "}
						<NextLink href="/login">
							<Link color="teal.500" href="#">
								LOGIN
							</Link>
						</NextLink>{" "}
						or{" "}
						<NextLink href="/register">
							<Link color="teal.500">REGISTER</Link>
						</NextLink>
						.
					</Text>
				</Box>
			)}

			<Box mt={16}>
				<Heading size="sm">Test accounts</Heading>
				<Box mt="8">simpleuser@vgvgvg.vg / password: 123456</Box>
				<Box mt="8">testadmin@@vgvgvg.vg / password: 123456</Box>
				<Box mt="8">approvedtestadmin@vgvgvg.vg / password: 123456</Box>
				<Box mt="8">testsuperadmin@@vgvgvg.vg / password: 123456</Box>
			</Box>
		</Layout>
	);
};

export default Home;
