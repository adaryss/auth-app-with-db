import { Heading } from "@chakra-ui/react";
import { Todo, User } from "@prisma/client";
import prismaClient from "db/client";
import { firebaseAdmin } from "firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { FC } from "react";
import Layout from "src/components/Layout";
import { TodosOverview } from "src/components/PageOverview/TodosOverview";
import { AUTH_USER_ID, USER_ID_TOKEN } from "src/contants/cookies";
import { UserRole } from "src/contants/user";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const userIdToken = parseCookies(ctx)[USER_ID_TOKEN];
	const userId = parseCookies(ctx)[AUTH_USER_ID];

	if (userIdToken && userId) {
		try {
			await firebaseAdmin.auth().verifyIdToken(userIdToken);

			const user = await prismaClient.user.findUnique({
				where: {
					uid: userId,
				},
			});

			if (user?.role === UserRole.ADMIN && user?.isAdminConfirmed) {
				const allTodos = await prismaClient.todo.findMany({
					include: {
						user: true,
					},
				});
				const users = await prismaClient.user.findMany();

				const groupedTodosByUser = (users ?? []).map((user) => {
					const todosByUser = (allTodos ?? []).filter(
						(todo) => todo.user.uid === user.uid
					);

					return {
						user: {
							uid: user.uid,
							email: user.email,
						},
						todos: todosByUser,
					};
				});

				return {
					props: {
						data: groupedTodosByUser,
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
		} catch (err) {
			return {
				redirect: {
					permanent: false,
					destination: "/login",
				},
				props: {
					data: null,
				},
			};
		}
	}

	return {
		redirect: {
			permanent: false,
			destination: "/login",
		},
		props: {
			data: null,
		},
	};
};

export interface UserTodo {
	readonly user: {
		readonly email: string;
		readonly uid: string;
	};
	readonly todos: (Todo & User)[];
}

interface OverviewProps {
	readonly data: UserTodo[];
}

const Overview: FC<OverviewProps> = ({ data }) => {
	return (
		<Layout>
			<Heading>User todos</Heading>
			{data && <TodosOverview userTodos={data} />}
		</Layout>
	);
};

export default Overview;
