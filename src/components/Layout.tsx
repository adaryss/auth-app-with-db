import React, { FC } from "react";
import styled from "styled-components";
import Head from "next/head";

import Menu from "src/components/Menu";
import Footer from "src/components/Footer";
import { GlobalStyles } from "src/styles/GlobalStyles";

const MainContainer = styled.div`
	padding: 0 20px;
`;

const Main = styled.main`
	max-width: 1216px;
	margin: 0 auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	min-height: 90vh;
	font-size: 16px;
	line-height: 1.3;
`;

const Layout: FC = ({ children }) => (
	<>
		<Head>
			<title>Todo app</title>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicon/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon/favicon-16x16.png"
			/>
			<link rel="manifest" href="/static/favicon/site.webmanifest" />
		</Head>
		<header>
			<Menu />
		</header>
		<MainContainer>
			<Main>{children}</Main>
		</MainContainer>
		<Footer />
		<GlobalStyles />
	</>
);

export default Layout;
