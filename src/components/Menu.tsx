import React, { FC, useCallback } from "react";

import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "src/contexts/AuthContext";
import { UserRole } from "src/contants/user";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";
import { useSWRConfig } from "swr";

const StyledListItem: FC<{ handleOnClick?: () => void }> = ({
	children,
	handleOnClick,
}) => (
	<ListItem
		sx={{
			color: "gray.700",
			listStyle: "none",
			fontSize: "16px",
			marginRight: "16px",
			cursor: "pointer",
			fontWeight: 600,
			letterSpacing: "0.2px",
		}}
		_hover={{
			color: "teal.500",
			textDecoration: "underline",
		}}
		onClick={() => handleOnClick && handleOnClick()}
	>
		{children}
	</ListItem>
);

const Menu = () => {
	const router = useRouter();
	const { user, handleLogout: handleLogoutUser, userData } = useAuth();
	const { mutate } = useSWRConfig();

	const isHome = router.pathname === "/";

	const isAdmin =
		userData.data?.user?.role === UserRole.ADMIN &&
		userData.data?.user?.isAdminConfirmed;
	const isSuperAdmin = userData.data?.user?.role === UserRole.SUPERADMIN;
	const isLoggedIn = user != null;
	const isLoggedOut = user == null;

	const handleLogout = useCallback(async () => {
		try {
			await handleLogoutUser();
			mutate("getCurrentUserData");
			if (!isHome) {
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		}
	}, [isHome, handleLogoutUser, router]);

	return (
		<Box as="nav" bg="gray.200" w="100%" p="16px 0">
			<UnorderedList
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<StyledListItem>
					<Link href="/">
						<a>Home</a>
					</Link>
				</StyledListItem>
				{isLoggedIn && (
					<StyledListItem>
						<Link href="/todos">
							<a>My todos</a>
						</Link>
					</StyledListItem>
				)}
				{isLoggedOut && (
					<>
						<StyledListItem>
							<Link href="/login">
								<a>Login</a>
							</Link>
						</StyledListItem>
						<StyledListItem>
							<Link href="/register">
								<a>Register</a>
							</Link>
						</StyledListItem>
					</>
				)}
				{(isAdmin || isSuperAdmin) && (
					<StyledListItem>
						<Link href="/overview">
							<a>Overview</a>
						</Link>
					</StyledListItem>
				)}
				{isSuperAdmin && (
					<StyledListItem>
						<Link href="/confirm-admin">
							<a>Confirm Admin</a>
						</Link>
					</StyledListItem>
				)}

				{isLoggedIn && <Box m="0 8px">{user.email}</Box>}

				{isLoggedIn && (
					<StyledListItem handleOnClick={handleLogout}>
						Logout
					</StyledListItem>
				)}
			</UnorderedList>
		</Box>
	);
};

export default Menu;
