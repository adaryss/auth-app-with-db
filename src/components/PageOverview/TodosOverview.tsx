import React, { FC } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";
import { UserTodo } from "src/pages/overview";
import { Todo as TodoType } from "src/pages/todos";
import { Todo } from "../shared/Todo";

interface TodosOverviewProps {
	readonly userTodos: UserTodo[];
}

export const TodosOverview: FC<TodosOverviewProps> = ({ userTodos }) => {
	return (
		<Box mt={8} mb={4} width="60%">
			<Accordion allowMultiple>
				{userTodos.map(({ user, todos }) => (
					<AccordionItem key={user.uid}>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									{user.email}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							{todos.map((todo) => (
								<Todo
									key={todo.id}
									todo={todo as TodoType}
									enableEdits={false}
								/>
							))}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Box>
	);
};
