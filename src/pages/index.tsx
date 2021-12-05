import Layout from "src/components/Layout";
import NextLink from "next/link";
import { useAuth } from "src/contexts/AuthContext";
import prismaClient from "db/client";
import { FC } from "toasted-notes/node_modules/@types/react";
import { Heading, Text, Link, Box } from "@chakra-ui/react";

export const getServerSideProps = async () => {
	try {
		const testData = await prismaClient.test.findMany();

		return {
			props: {
				testData,
			},
		};
	} catch (err) {
		if (err instanceof Error) {
			throw Error(`Something went wrong! ${err.message}`);
		}
	}

	return {
		props: {
			testData: null,
		},
	};
};

interface HomeProps {
	readonly testData: any[];
}

const Home: FC<HomeProps> = ({ testData }) => {
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
			<div>
				TEST DATA:
				{testData.map((i) => (
					<div>
						id: {i.id} content: {i.content}
					</div>
				))}
			</div>
		</Layout>
	);
};

export default Home;
