import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { User } from "@prisma/client";
import prismaClient from "db/client";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import React, { FC, useEffect, useState } from "react";
import Layout from "src/components/Layout";
import { AUTH_USER_ID } from "src/contants/cookies";
import { UserRole } from "src/contants/user";
import { useConfirmAdmin } from "src/hooks/useConfirmAdmin";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const userIdToken = parseCookies(ctx)[AUTH_USER_ID];

	const user = await prismaClient.user.findUnique({
		where: {
			uid: userIdToken,
		},
	});

	if (user?.role === UserRole.SUPERADMIN) {
		const usersWithoutAdminConfirmation = await prismaClient.user.findMany({
			where: {
				role: UserRole.ADMIN,
				isAdminConfirmed: false,
			},
		});

		return {
			props: {
				data: usersWithoutAdminConfirmation,
			},
		};
	}

	return {
		redirect: {
			permanent: false,
			destination: "/",
		},
		props: {
			data: null,
		},
	};
};

const ADMIN_CONFIRM_ERROR = "ADMIN_CONFIRM_ERROR";
const ADMIN_CONFIRM_SUCCESS = "ADMIN_CONFIRM_SUCCESS";

interface ConfirmAdminProps {
	readonly data: User[];
}

const ConfirmAdmin: FC<ConfirmAdminProps> = ({ data }) => {
	const [users, setUsers] = useState(data ?? []);
	const [confirmSuccess, setConfirmSuccess] = useState(false);
	const {
		handleConfirmAdmin: confirmAdmin,
		confirmLoading,
		confirmError,
	} = useConfirmAdmin();
	const toast = useToast();

	const handleConfirmAdmin = async (userId: string) => {
		setConfirmSuccess(false);
		const response = await confirmAdmin(userId);
		if (response.message === "Success") {
			const newUsers = users.filter(
				(user) => user.id !== response?.data?.id
			);
			setUsers(newUsers);
			setConfirmSuccess(true);
		}
	};

	useEffect(() => {
		confirmError &&
			!toast.isActive(ADMIN_CONFIRM_ERROR) &&
			toast({
				id: ADMIN_CONFIRM_ERROR,
				title: "Failed to confirm user",
				description: "Please try again.",
				status: "error",
				duration: null,
				isClosable: true,
			});
	}, [confirmError]);

	useEffect(() => {
		confirmSuccess &&
			!toast.isActive(ADMIN_CONFIRM_SUCCESS) &&
			toast({
				id: ADMIN_CONFIRM_SUCCESS,
				title: "Success",
				description: "Confirmation successful",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
	}, [confirmSuccess]);

	return (
		<Layout>
			<Heading mt={8}>Admin accounts waiting for confirmation</Heading>
			<Box width="60%" mt={12}>
				{users.length > 0 ? (
					users.map((account) => (
						<Flex
							key={account.id}
							justifyContent="space-between"
							alignItems="center"
							gap="2"
						>
							<Box p="2">
								<Heading size="sm">{account.email}</Heading>
							</Box>
							<Button
								onClick={() => handleConfirmAdmin(account.uid)}
								size="sm"
								colorScheme="teal"
								disabled={confirmLoading}
							>
								Confirm
							</Button>
						</Flex>
					))
				) : (
					<Flex justifyContent="center" alignItems="center">
						<Box p="2">
							<Heading size="sm">No accounts</Heading>
						</Box>
					</Flex>
				)}
			</Box>
		</Layout>
	);
};

export default ConfirmAdmin;
