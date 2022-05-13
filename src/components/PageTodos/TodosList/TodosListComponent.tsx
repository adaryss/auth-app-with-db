import React, { FC, Dispatch } from "react";
import { Box, Heading, Skeleton, Stack } from "@chakra-ui/react";

import { Todo as TodoType } from "src/pages/todos";
import { TodosListWrapper } from "./TodosListWrapper";
import { TodosList } from "./TodosList";

interface TodosListComponentProps {
	readonly todos: TodoType[];
	readonly setTodos: Dispatch<TodoType[]>;
	readonly todosLoading: boolean;
}

const TodosListComponent: FC<TodosListComponentProps> = ({
	todos,
	setTodos,
	todosLoading,
}) => {
	const hasAnyTodos = todos.length > 0;

	return (
		<TodosListWrapper>
			<Box textAlign="center">
				<Heading>
					{hasAnyTodos ? "Your Todos" : "Todos are empty"}
				</Heading>
			</Box>
			{todosLoading ? (
				<Stack mt="24px">
					<Skeleton height="60px" />
					<Skeleton height="60px" />
					<Skeleton height="60px" />
					<Skeleton height="60px" />
				</Stack>
			) : (
				<>
					{hasAnyTodos && (
						<TodosList todos={todos} setTodos={setTodos} />
					)}
				</>
			)}
		</TodosListWrapper>
	);
};

export default TodosListComponent;
