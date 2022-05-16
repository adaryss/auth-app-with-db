import React, { FC, useCallback } from "react";
import { TabPanels, TabPanel, useToast } from "@chakra-ui/react";
import { Todo } from "../../shared/Todo";
import { useUpdateTodoStatus } from "src/hooks/useUpdateTodoStatus";
import { useDeleteTodo } from "src/hooks/useDeleteTodo";
import { Todo as TodoType } from "src/pages/todos";

const ERROR_UPDATE_TOAST_ID = "UPDATE_TODO_DONE_ERROR";
const ERROR_DELETE_TODO_ID = "ERROR_DELETE_TODO_ID";

interface FilteredTodoListProps {
	readonly todos: TodoType[];
	readonly highPrioTodos: TodoType[];
	readonly mediumPrioTodos: TodoType[];
	readonly lowPrioTodos: TodoType[];
	readonly doneTodos: TodoType[];
	readonly setTodos: React.Dispatch<TodoType[]>;
}

export const FilteredTodoList: FC<FilteredTodoListProps> = ({
	todos,
	highPrioTodos,
	mediumPrioTodos,
	lowPrioTodos,
	doneTodos,
	setTodos,
}) => {
	const { handleUpdateTodoState, todoStateLoading, todoStateError } =
		useUpdateTodoStatus();
	const {
		handleDeleteTodo: deleteTodo,
		todoDeleteLoading,
		todoDeleteError,
	} = useDeleteTodo();
	const toast = useToast();

	const handleDeleteTodo = useCallback(
		async (id: string) => {
			const response = await deleteTodo(id);
			const deletedTodoId = response.data.id;
			const myTodos = [...todos];
			const filteredTodos = myTodos.filter((i) => i.id !== deletedTodoId);

			setTodos(filteredTodos);
		},
		[todos]
	);

	const handleDoneTodo = useCallback(
		async (id: string) => {
			const response = await handleUpdateTodoState(id);
			const doneTodoId = response.data.id;
			const myTodos = [...todos];
			const doneTodo = myTodos.find((i) => i.id === doneTodoId);

			if (doneTodo) {
				const doneTodoIndex = myTodos.indexOf(doneTodo);
				myTodos[doneTodoIndex] = { ...doneTodo, done: true };
				setTodos(myTodos);
			}
		},
		[todos]
	);

	return (
		<TabPanels>
			<TabPanel>
				{todos.map((todo, idx) => (
					<Todo
						key={`${idx}-all-todos`}
						todo={todo}
						handleDeleteTodo={handleDeleteTodo}
						handleDoneTodo={handleDoneTodo}
						todoStateLoading={todoStateLoading}
						todoDeleteLoading={todoDeleteLoading}
					/>
				))}
			</TabPanel>
			<TabPanel>
				{highPrioTodos.map((todo, idx) => (
					<Todo
						key={`${idx}-high-prio`}
						todo={todo}
						handleDeleteTodo={handleDeleteTodo}
						handleDoneTodo={handleDoneTodo}
						todoStateLoading={todoStateLoading}
						todoDeleteLoading={todoDeleteLoading}
					/>
				))}
			</TabPanel>
			<TabPanel>
				{mediumPrioTodos.map((todo, idx) => (
					<Todo
						key={`${idx}-medium-prio`}
						todo={todo}
						handleDeleteTodo={handleDeleteTodo}
						handleDoneTodo={handleDoneTodo}
						todoStateLoading={todoStateLoading}
						todoDeleteLoading={todoDeleteLoading}
					/>
				))}
			</TabPanel>
			<TabPanel>
				{lowPrioTodos.map((todo, idx) => (
					<Todo
						key={`${idx}-low-prio`}
						todo={todo}
						handleDeleteTodo={handleDeleteTodo}
						handleDoneTodo={handleDoneTodo}
						todoStateLoading={todoStateLoading}
						todoDeleteLoading={todoDeleteLoading}
					/>
				))}
			</TabPanel>
			<TabPanel>
				{doneTodos.map((todo, idx) => (
					<Todo
						key={`${idx}-done-todo`}
						todo={todo}
						handleDeleteTodo={handleDeleteTodo}
						handleDoneTodo={handleDoneTodo}
						todoStateLoading={todoStateLoading}
						todoDeleteLoading={todoDeleteLoading}
					/>
				))}
			</TabPanel>
			{todoStateError &&
				!toast.isActive(ERROR_UPDATE_TOAST_ID) &&
				toast({
					id: ERROR_UPDATE_TOAST_ID,
					title: "Failed to update todo",
					description: "Please try again.",
					status: "error",
					duration: null,
					isClosable: true,
				})}
			{todoDeleteError &&
				!toast.isActive(ERROR_DELETE_TODO_ID) &&
				toast({
					id: ERROR_DELETE_TODO_ID,
					title: "Failed to delete todo",
					description: "Please try again.",
					status: "error",
					duration: null,
					isClosable: true,
				})}
		</TabPanels>
	);
};
