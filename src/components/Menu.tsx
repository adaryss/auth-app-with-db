import React from "react";
import styled from "styled-components";

import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "src/contexts/AuthContext";
import { UserRole } from "src/contants/user";

const NavigationWrapper = styled.nav`
	background: #edf2f7;
	width: 100%;
	padding: 16px 0;
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

const User = styled.div`
	margin: 0 8px;
`;

const Menu = () => {
	const router = useRouter();
	const { user, handleLogout: handleLogoutUser, userData } = useAuth();

	const isHome = router.pathname === "/";

	const isAdmin = userData.data?.user?.role === UserRole.ADMIN && userData.data?.user?.isAdminConfirmed;
	const isLoggedIn = user != null;
	const isLoggedOut = user == null;

	const handleLogout = async () => {
		try {
			await handleLogoutUser();
			if (!isHome) {
				router.push("/");
			}
		} catch (error) {
			console.error(error);
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
					<MenuItem>
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
					<User>{user.email}</User>
				)}

				{isLoggedIn && (
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				)}
			</Navigation>
		</NavigationWrapper>
	);
};

export default Menu;
