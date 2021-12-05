import React, { FC, Dispatch } from "react";
import {
	Box,
	Flex,
	Heading,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Tag,
	TagLabel,
} from "@chakra-ui/react";

import { Priority, Todo as TodoType } from "src/pages/todos";
import { Todo } from "./Todo";

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

const TodosList: FC<TodosListProps> = ({ todos, setTodos }) => {
	const hasAnyTodos = todos.length > 0;
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
		<Flex width="60%" align="center" justifyContent="center" mt="8">
			<Box width="full" p={2}>
				<Box textAlign="center">
					<Heading>
						{hasAnyTodos ? "Your Todos" : "Todos are empty"}
					</Heading>
				</Box>
				{hasAnyTodos && (
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
									<TagLabel>
										{mediumPrioTodos.length}
									</TagLabel>
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
								{todos.map((todo) => (
									<Todo
										todo={todo}
										handleDeleteTodo={handleDeleteTodo}
										handleDoneTodo={handleDoneTodo}
									/>
								))}
							</TabPanel>
							<TabPanel>
								{highPrioTodos.map((todo) => (
									<Todo
										todo={todo}
										handleDeleteTodo={handleDeleteTodo}
										handleDoneTodo={handleDoneTodo}
									/>
								))}
							</TabPanel>
							<TabPanel>
								{mediumPrioTodos.map((todo) => (
									<Todo
										todo={todo}
										handleDeleteTodo={handleDeleteTodo}
										handleDoneTodo={handleDoneTodo}
									/>
								))}
							</TabPanel>
							<TabPanel>
								{lowPrioTodos.map((todo) => (
									<Todo
										todo={todo}
										handleDeleteTodo={handleDeleteTodo}
										handleDoneTodo={handleDoneTodo}
									/>
								))}
							</TabPanel>
							<TabPanel>
								{doneTodos.map((todo) => (
									<Todo
										todo={todo}
										handleDeleteTodo={handleDeleteTodo}
										handleDoneTodo={handleDoneTodo}
									/>
								))}
							</TabPanel>
						</TabPanels>
					</Tabs>
				)}
			</Box>
		</Flex>
	);
};

export default TodosList;
