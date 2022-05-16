import React, { FC } from "react";
import { Box, Flex, Heading, Alert, AlertIcon } from "@chakra-ui/react";

import { Priority, Todo as TodoType } from "src/pages/todos";
import { format } from "date-fns";
import { UpdateTodoStateButton } from "../PageTodos/Todo/UpdateTodoStateButton";
import { DeleteTodoButton } from "../PageTodos/Todo/DeleteTodoButton";

const getAlertStatus = (priority: Priority, done: boolean) => {
	if (done) {
		return "success";
	}

	switch (priority) {
		case Priority.LOW:
			return "info";
		case Priority.HIGH:
			return "error";
		default:
			return "warning";
	}
};

interface TodoProps {
	readonly todo: TodoType;
	readonly handleDeleteTodo?: (id: string) => void;
	readonly handleDoneTodo?: (id: string) => void;
	readonly todoStateLoading?: boolean;
	readonly todoDeleteLoading?: boolean;
	readonly enableEdits?: boolean;
}

export const Todo: FC<TodoProps> = ({
	todo,
	handleDeleteTodo,
	handleDoneTodo,
	todoStateLoading = false,
	todoDeleteLoading = false,
	enableEdits = true,
}) => {
	const showEditingButtons =
		enableEdits && handleDeleteTodo && handleDoneTodo;

	return (
		<Alert
			key={todo.id}
			status={getAlertStatus(todo.priority, todo.done)}
			borderRadius="8px"
			mt="8"
			overflow="visible"
		>
			<Flex width="full">
				<AlertIcon />
				<Box width="full">
					<Heading as="h4" size="md" mb="2">
						{todo.title}
					</Heading>
					{todo.description.length > 0 && (
						<div>{todo.description}</div>
					)}
					<Flex width="full" justifyContent="space-between" mt="2">
						<Box style={{ textTransform: "capitalize" }}>
							Priority: <strong>{todo.priority}</strong>
						</Box>

						<Box>
							<div>
								{format(new Date(todo.date), "H:m MM/dd/yy")}
							</div>
						</Box>
						{showEditingButtons && (
							<Box>
								{!todo.done && (
									<UpdateTodoStateButton
										todo={todo}
										handleDoneTodo={handleDoneTodo}
										todoStateLoading={todoStateLoading}
									/>
								)}
								<DeleteTodoButton
									handleDeleteTodo={handleDeleteTodo}
									todo={todo}
									todoDeleteLoading={todoDeleteLoading}
								/>
							</Box>
						)}
					</Flex>
				</Box>
			</Flex>
		</Alert>
	);
};
