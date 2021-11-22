import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	html,
	body {
		padding: 0;
		margin: 0;
		font-family: 'Lato', sans-serif;
		font-size: 62.5%;
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
