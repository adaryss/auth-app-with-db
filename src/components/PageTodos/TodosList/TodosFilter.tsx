import React, { FC } from "react";
import { TabList, Tab, Tag, TagLabel } from "@chakra-ui/react";
import { Todo as TodoType } from "src/pages/todos";

interface TodosFilter {
	readonly todos: TodoType[];
	readonly highPrioTodos: TodoType[];
	readonly mediumPrioTodos: TodoType[];
	readonly lowPrioTodos: TodoType[];
	readonly doneTodos: TodoType[];
}

export const TodosFilter: FC<TodosFilter> = ({
	todos,
	highPrioTodos,
	mediumPrioTodos,
	lowPrioTodos,
	doneTodos,
}) => {
	return (
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
	);
};
