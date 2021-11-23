import Layout from "src/components/Layout";
import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "src/contexts/AuthContext";

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

const Home = () => {
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
		</Layout>
	);
};

export default Home;
