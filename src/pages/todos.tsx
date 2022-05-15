import React, { useState, useRef, useCallback, FC } from "react";
import Layout from "src/components/Layout";
import { parseCookies } from "nookies";
import { firebaseAdmin } from "firebaseAdmin";
import { AUTH_USER_ID, USER_ID_TOKEN } from "src/contants/cookies";
import { GetServerSidePropsContext } from "next";

import {
	Box,
	Flex,
	Button,
	HStack,
	Tag,
	TagLabel,
	TagCloseButton,
	useToast,
} from "@chakra-ui/react";
import TodosListComponent from "src/components/PageTodos/TodosList/TodosListComponent";
import { TodosForm } from "src/components/PageTodos/TodosForm";
import { useAuth } from "src/contexts/AuthContext";
import prismaClient from "db/client";
import { usePostNewTodo } from "src/hooks/usePostNewTodo";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const userIdToken = parseCookies(ctx)[USER_ID_TOKEN];
	const userId = parseCookies(ctx)[AUTH_USER_ID];

	if (userIdToken && userId) {
		try {
			await firebaseAdmin.auth().verifyIdToken(userIdToken);
			const todos = await prismaClient.todo.findMany({
				where: {
					user: {
						uid: userId,
					},
				},
			});

			return {
				props: {
					todosData: todos,
				},
			};
		} catch (err) {
			return {
				redirect: {
					permanent: false,
					destination: "/login",
				},
				props: {
					todosData: null,
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
			todosData: null,
		},
	};
};

export enum Priority {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
}

const ERROR_TOAST_ID = "todos-error-toast";

export interface Todo {
	readonly id?: string;
	readonly date: number;
	readonly title: string;
	readonly description: string;
	readonly priority: Priority;
	readonly done: boolean;
}

interface TodosProps {
	readonly todosData: Todo[];
}

const Todos: FC<TodosProps> = ({ todosData }) => {
	const [showTodoForm, setShowTodoForm] = useState(false);
	const [hasMoreInfo, setMoreInfo] = useState(false);
	const todoRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const todoDetailRef =
		useRef() as React.MutableRefObject<HTMLTextAreaElement>;
	const [prio, setPrio] = useState<Priority>(Priority.MEDIUM);
	const { handlePostNewTodo, todosLoading, todosError } = usePostNewTodo();
	const { userData } = useAuth();
	const toast = useToast();

	const sortedTodos = (todosData ?? []).sort((a, b) => b.date - a.date);
	const [todos, setTodos] = useState<Todo[]>(sortedTodos ?? []);

	const handleAddTodo = useCallback(
		async (e: React.FormEvent<Element>) => {
			e.preventDefault();

			const newTodo: Todo = {
				title: todoRef.current.value,
				description: todoDetailRef.current.value ?? "",
				priority: prio,
				date: Date.now(),
				done: false,
			};
			const userId = userData?.data?.user?.uid;

			if (userId) {
				const { data: addedTodo } = await handlePostNewTodo(
					newTodo,
					userId
				);
				addedTodo && setTodos([addedTodo, ...todos]);
				handleClearForm();
			}
		},
		[todoRef.current, todoDetailRef.current, prio, todos, userData]
	);

	const handleClearForm = useCallback(() => {
		todoRef.current.value = "";
		handleClearDetail();
		setPrio(Priority.MEDIUM);
	}, []);

	const handleClearDetail = useCallback(() => {
		todoDetailRef.current.value = "";
		setMoreInfo(false);
	}, []);

	const handleHideForm = useCallback(() => {
		setShowTodoForm(false);
		handleClearForm();
	}, []);

	return (
		<Layout>
			<Flex
				width="60%"
				align="center"
				justifyContent="center"
				flexDirection="column"
			>
				<Box
					width="full"
					p={2}
					display={showTodoForm ? "block" : "none"}
				>
					<TodosForm
						handleAddTodo={handleAddTodo}
						todoRef={todoRef}
						hasMoreInfo={hasMoreInfo}
						todoDetailRef={todoDetailRef}
						handleClearDetail={handleClearDetail}
						setMoreInfo={setMoreInfo}
						prio={prio}
						setPrio={setPrio}
						todosLoading={todosLoading}
					/>
				</Box>
				{showTodoForm ? (
					<HStack
						cursor="pointer"
						mt="2"
						spacing={4}
						justify="center"
						onClick={handleHideForm}
					>
						<Tag size="md" variant="solid" borderRadius="full">
							<TagCloseButton m="0" mr="4px" />
							<TagLabel>Hide form</TagLabel>
						</Tag>
					</HStack>
				) : (
					<Button
						type="button"
						width="50%"
						mt={8}
						onClick={() => setShowTodoForm(true)}
						colorScheme="green"
					>
						Add new todo
					</Button>
				)}
			</Flex>

			<TodosListComponent
				todos={todos}
				setTodos={setTodos}
				todosLoading={todosLoading}
			/>

			{todosError && !toast.isActive(ERROR_TOAST_ID) &&
				toast({
					id: ERROR_TOAST_ID,
					title: "Failed to add todo",
					description: "Please try again.",
					status: "error",
					duration: null,
					isClosable: true,
				})}
		</Layout>
	);
};

export default Todos;
