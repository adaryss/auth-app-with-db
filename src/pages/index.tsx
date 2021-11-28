import Layout from "src/components/Layout";
import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "src/contexts/AuthContext";
import prismaClient from "db/client";
import { FC } from "toasted-notes/node_modules/@types/react";

const TextWrapper = styled.div`
	text-align: center;
`;

const StyledLink = styled.a`
	color: blue;
	text-transform: uppercase;

	&:hover {
		color: lightblue;
	}
`;

export const getServerSideProps = async () => {
	try {
		const testData = await prismaClient.test.findMany();

		return {
			props: {
				testData,
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			throw Error(`Something went wrong! ${err.message}`)
		}
	}

	return {
		props: {
			testData: null,
		}
	}
}

interface HomeProps {
	readonly testData: any[];
}

const Home: FC<HomeProps> = ({ testData }) => {
	const { user } = useAuth();

	return (
		<Layout>
			{user ? (
				<TextWrapper>
					Your todo app.
					<br />
					You can start adding your todos{' '}
					<Link href="/todos">
						<StyledLink>here</StyledLink>
					</Link>
					.
				</TextWrapper>
			) : (
				<TextWrapper>
					Your todo app.
					<br />
					For start saving todos, please
					<br />
					<Link href="/login">
						<StyledLink>Log in</StyledLink>
					</Link>{" "}
					or{" "}
					<Link href="/register">
						<StyledLink>register</StyledLink>
					</Link>
					.
				</TextWrapper>
			)}
			<div>
				TEST DATA: 
				{testData.map(i => (
					<div>
						id: {i.id}{' '}
						content: {i.content}
					</div>
				))}
			</div>
		</Layout>
	);
};

export default Home;
