import React, { FC } from "react";
import {
	Box,
	Flex,
	Heading,
	Alert,
	AlertIcon,
	Tag,
	TagLeftIcon,
	TagLabel,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverHeader,
	PopoverBody,
	Popover,
	Button,
} from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";

import { Priority, Todo as TodoType } from "src/pages/todos";
import { format } from "date-fns";

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
	readonly handleDeleteTodo: (id: string) => void;
	readonly handleDoneTodo: (id: string) => void;
}

export const Todo: FC<TodoProps> = ({ todo, handleDeleteTodo, handleDoneTodo }) => {
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
						<Box>
							{!todo.done && (
								<Popover>
									<PopoverTrigger>
										<Tag
											size="md"
											variant="solid"
											borderRadius="full"
											cursor="pointer"
											mr="2"
										>
											<TagLeftIcon
												boxSize="12px"
												as={CheckIcon}
											/>
											<TagLabel>Done</TagLabel>
										</Tag>
									</PopoverTrigger>
									<PopoverContent>
										<PopoverArrow />
										<PopoverCloseButton />
										<PopoverHeader>
											Confirmation
										</PopoverHeader>
										<PopoverBody
											display="flex"
											alignItems="center"
											justifyContent="center"
											flexDirection="column"
										>
											<Box>
												Are you sure you want to mark
												this todo as done?
											</Box>
											<Button
												type="button"
												mt="4"
												colorScheme="green"
												onClick={() =>
													handleDoneTodo(todo.id)
												}
											>
												Done
											</Button>
										</PopoverBody>
									</PopoverContent>
								</Popover>
							)}
							<Popover>
								<PopoverTrigger>
									<Tag
										size="md"
										variant="solid"
										borderRadius="full"
										cursor="pointer"
										overflow="visible"
									>
										<TagLeftIcon
											boxSize="12px"
											as={DeleteIcon}
										/>
										<TagLabel>Delete</TagLabel>
									</Tag>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverHeader>Confirmation</PopoverHeader>
									<PopoverBody
										display="flex"
										alignItems="center"
										justifyContent="center"
										flexDirection="column"
									>
										<Box>
											Are you sure you want to delete this
											todo?
										</Box>
										<Button
											type="button"
											mt="4"
											colorScheme="red"
											onClick={() =>
												handleDeleteTodo(todo.id)
											}
										>
											Delete
										</Button>
									</PopoverBody>
								</PopoverContent>
							</Popover>
						</Box>
					</Flex>
				</Box>
			</Flex>
		</Alert>
	);
};
