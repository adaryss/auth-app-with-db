import React, { useState, useRef, useCallback } from "react";
import Layout from "src/components/Layout";
import { parseCookies } from "nookies";
import { firebaseAdmin } from "firebaseAdmin";
import { AUTH_USER_ID, USER_ID_TOKEN } from "src/contants/cookies";
import { GetServerSidePropsContext } from "next";
import { v4 as uuidv4 } from 'uuid';

import {
	Box,
	Flex,
	Button,
	HStack,
	Tag,
	TagLabel,
	TagCloseButton,
} from "@chakra-ui/react";
import TodosList from "src/components/PageTodos/TodosList";
import { TodosForm } from "src/components/PageTodos/TodosForm";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const userIdToken = parseCookies(ctx)[USER_ID_TOKEN];
	const userId = parseCookies(ctx)[AUTH_USER_ID];

	if (userIdToken && userId) {
		try {
			await firebaseAdmin
				.auth()
				.verifyIdToken(userIdToken);

			return {
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

export enum Priority {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
}

export interface Todo {
	readonly id: string;
	readonly date: number;
	readonly title: string;
	readonly description: string;
	readonly priority: Priority;
	readonly done: boolean;
}

const Todos = () => {
	const [showTodoForm, setShowTodoForm] = useState(false);
	const [hasMoreInfo, setMoreInfo] = useState(false);
	const todoRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const todoDetailRef =
		useRef() as React.MutableRefObject<HTMLTextAreaElement>;
	const [prio, setPrio] = useState<Priority>(Priority.MEDIUM);

	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAddTodo = useCallback((e: React.FormEvent<Element>) => {
		e.preventDefault();

		const newTodo: Todo = {
			title: todoRef.current.value,
			description: todoDetailRef.current.value ?? "",
			priority: prio,
			date: Date.now(),
			done: false,
			id: uuidv4(),
		};

		setTodos([newTodo, ...todos]);
		handleClearForm();
	}, [todoRef.current, todoDetailRef.current, prio, todos]);

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

			<TodosList todos={todos} setTodos={setTodos} />
		</Layout>
	);
};

export default Todos;
