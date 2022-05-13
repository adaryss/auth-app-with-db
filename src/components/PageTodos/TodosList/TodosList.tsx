import React, { FC, Dispatch, useCallback } from "react";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Tag,
	TagLabel,
} from "@chakra-ui/react";

import { Priority, Todo as TodoType } from "src/pages/todos";
import { Todo } from "../Todo";

interface TodosListProps {
	readonly todos: TodoType[];
	readonly setTodos: Dispatch<TodoType[]>;
}

export const TodosList: FC<TodosListProps> = ({ todos, setTodos }) => {
	const getTodosByPriority = useCallback(
		(todos: TodoType[], priority: Priority) => {
			const priorityTodos = todos.filter(
				(todo) => todo.priority === priority
			);

			return priorityTodos;
		},
		[todos]
	);

	const getDoneTodos = useCallback(
		(todos: TodoType[]) => {
			const doneTodos = todos.filter((todo) => todo.done === true);
			return doneTodos;
		},
		[todos]
	);

	const highPrioTodos = getTodosByPriority(todos, Priority.HIGH);
	const mediumPrioTodos = getTodosByPriority(todos, Priority.MEDIUM);
	const lowPrioTodos = getTodosByPriority(todos, Priority.LOW);
	const doneTodos = getDoneTodos(todos);

	const handleDeleteTodo = (id: string) => {
		const myTodos = [...todos];
		const filteredTodos = myTodos.filter((i) => i.id !== id);

		setTodos(filteredTodos);
	};

	const handleDoneTodo = (id: string) => {
		const myTodos = [...todos];
		const doneTodo = myTodos.find((i) => i.id === id);

		if (doneTodo) {
			const doneTodoIndex = myTodos.indexOf(doneTodo);

			myTodos[doneTodoIndex] = { ...doneTodo, done: true };

			setTodos(myTodos);
		}
	};
	return (
		<Tabs variant="soft-rounded" colorScheme="green" mt="6">
			<TabList justifyContent="center">
				<Tab>
					All{" "}
					<Tag
						size="sm"
						variant="solid"
						borderRadius="full"
						background="rgba(0,0,0,0.1)"
						color="inherit"
						ml="2"
					>
						<TagLabel>{todos.length}</TagLabel>
					</Tag>
				</Tab>
				<Tab>
					High{" "}
					<Tag
						size="sm"
						variant="solid"
						borderRadius="full"
						background="rgba(0,0,0,0.1)"
						color="inherit"
						ml="2"
					>
						<TagLabel>{highPrioTodos.length}</TagLabel>
					</Tag>
				</Tab>
				<Tab>
					Medium{" "}
					<Tag
						size="sm"
						variant="solid"
						borderRadius="full"
						background="rgba(0,0,0,0.1)"
						color="inherit"
						ml="2"
					>
						<TagLabel>{mediumPrioTodos.length}</TagLabel>
					</Tag>
				</Tab>
				<Tab>
					Low{" "}
					<Tag
						size="sm"
						variant="solid"
						borderRadius="full"
						background="rgba(0,0,0,0.1)"
						color="inherit"
						ml="2"
					>
						<TagLabel>{lowPrioTodos.length}</TagLabel>
					</Tag>
				</Tab>
				<Tab>
					Done{" "}
					<Tag
						size="sm"
						variant="solid"
						borderRadius="full"
						background="rgba(0,0,0,0.1)"
						color="inherit"
						ml="2"
					>
						<TagLabel>{doneTodos.length}</TagLabel>
					</Tag>
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					{todos.map((todo, idx) => (
						<Todo
							key={`${idx}-all-todos`}
							todo={todo}
							handleDeleteTodo={handleDeleteTodo}
							handleDoneTodo={handleDoneTodo}
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
						/>
					))}
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};
