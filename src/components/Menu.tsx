import React from "react";
import styled from "styled-components";

import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const NavigationWrapper = styled.nav`
	background: #cecece;
	width: 100%;
`;

const Navigation = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MenuItem = styled.li`
	list-style: none;
	font-size: 16px;
	margin-right: 16px;
	text-decoration: underline;
	cursor: pointer;

	&:hover {
		color: red;
	}
`;

const Menu = () => {
	const router = useRouter();
	const isHome = router.pathname === "/";

	const isAdmin = true;
	const isLoggedIn = true;
	const isLoggedOut = true;

	const handleLogout = () => {
		if (!isHome) {
			router.push("/");
		}
	};
	return (
		<NavigationWrapper>
			<Navigation>
				<MenuItem>
					<Link href="/">
						<a>Home</a>
					</Link>
				</MenuItem>
				{isLoggedIn && (
					<MenuItem onClick={handleLogout}>
						<Link href="/todos">
							<a>My todos</a>
						</Link>
					</MenuItem>
				)}
				{isLoggedOut && (
					<>
						<MenuItem>
							<Link href="/login">
								<a>Login</a>
							</Link>
						</MenuItem>
						<MenuItem>
							<Link href="/register">
								<a>Register</a>
							</Link>
						</MenuItem>
					</>
				)}
				{isAdmin && isLoggedIn && (
					<MenuItem>
						<Link href="/overview">
							<a>Overview</a>
						</Link>
					</MenuItem>
				)}
				{isLoggedIn && (
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				)}
			</Navigation>
		</NavigationWrapper>
	);
};

export default Menu;
