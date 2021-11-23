import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		font-family: 'Lato', sans-serif;
		color: black;
	}

	a {
		color: inherit;
		text-decoration: none;
		cursor: pointer;
	}

	* {
		box-sizing: border-box;
		font: inherit;
		color: inherit;
	}
`;
