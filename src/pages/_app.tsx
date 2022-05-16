import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "src/contexts/AuthContext";
import { theme as defaultTheme } from "@chakra-ui/react";

const theme = {
	...defaultTheme,
	styles: {
		global: {
			body: {
				padding: 0,
				margin: 0,
				fontFamily: "'Lato', sans-serif",
				color: "gray.700",
			},
			a: {
				color: "inherit",
				textDecoration: "none",
				cursor: "pointer",
			},
			"*": {
				boxSizing: "border-box",
				font: "inherit",
				color: "inherit",
			},
		},
	},
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
