import React, { FC, Dispatch, useCallback, useMemo } from "react";
import { Tabs } from "@chakra-ui/react";

import { Priority, Todo as TodoType } from "src/pages/todos";
import { TodosFilter } from "./TodosFilter";
import { FilteredTodoList } from "./FilteredTodoList";

const getTodosByPriority = (todos: TodoType[], priority: Priority) => {
	const priorityTodos = todos.filter((todo) => todo.priority === priority);
	return priorityTodos;
};

const getDoneTodos = (todos: TodoType[]) => {
	const doneTodos = todos.filter((todo) => todo.done === true);
	return doneTodos;
};

interface TodosListProps {
	readonly todos: TodoType[];
	readonly setTodos: Dispatch<TodoType[]>;
}

export const TodosList: FC<TodosListProps> = ({ todos, setTodos }) => {
	const highPrioTodos = useMemo(
		() => getTodosByPriority(todos, Priority.HIGH),
		[todos]
	);
	const mediumPrioTodos = useMemo(
		() => getTodosByPriority(todos, Priority.MEDIUM),
		[todos]
	);
	const lowPrioTodos = useMemo(
		() => getTodosByPriority(todos, Priority.LOW),
		[todos]
	);
	const doneTodos = useMemo(() => getDoneTodos(todos), [todos]);

	return (
		<Tabs variant="soft-rounded" colorScheme="green" mt="6">
			<TodosFilter
				todos={todos}
				highPrioTodos={highPrioTodos}
				mediumPrioTodos={mediumPrioTodos}
				lowPrioTodos={lowPrioTodos}
				doneTodos={doneTodos}
			/>
			<FilteredTodoList
				todos={todos}
				highPrioTodos={highPrioTodos}
				mediumPrioTodos={mediumPrioTodos}
				lowPrioTodos={lowPrioTodos}
				doneTodos={doneTodos}
				setTodos={setTodos}
			/>
		</Tabs>
	);
};
