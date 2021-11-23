import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
	width: 100%;
	background: darkcyan;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 10vh;
	font-size: 16px;
	line-height: 1.3;
`;

const Footer = () => <Wrapper>Footer</Wrapper>;

export default Footer;
