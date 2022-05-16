import React, { FC } from "react";
import Head from "next/head";

import Menu from "src/components/Menu";
import Footer from "src/components/Footer";
import { Box } from "@chakra-ui/react";

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
		<Box p="0 20px">
			<Box
				as="main"
				sx={{
					maxWidth: "1216px",
					margin: "0 auto",
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					flexDirection: "column",
					minHeight: "calc(100vh - 56px - 52.8px)",
					fontSize: "16px",
					lineHeight: "1.3",
				}}
			>
				{children}
			</Box>
		</Box>
		<Footer />
	</>
);

export default Layout;
