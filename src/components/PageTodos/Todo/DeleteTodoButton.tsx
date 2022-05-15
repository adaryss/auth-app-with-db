import React, { FC } from "react";
import {
	Box,
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
import { DeleteIcon } from "@chakra-ui/icons";
import { Todo as TodoType } from "src/pages/todos";

interface DeleteTodoButtonProps {
	readonly handleDeleteTodo: (id: string) => void;
	readonly todo: TodoType;
	readonly todoDeleteLoading: boolean;
}

export const DeleteTodoButton: FC<DeleteTodoButtonProps> = ({
	handleDeleteTodo,
	todo,
	todoDeleteLoading,
}) => {
	return (
		<Popover>
			<PopoverTrigger>
				<Tag
					size="md"
					variant="solid"
					borderRadius="full"
					cursor="pointer"
					overflow="visible"
				>
					<TagLeftIcon boxSize="12px" as={DeleteIcon} />
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
					<Box>Are you sure you want to delete this todo?</Box>
					<Button
						type="button"
						mt="4"
						colorScheme="red"
						onClick={() => handleDeleteTodo(todo.id ?? "")}
						disabled={todoDeleteLoading}
					>
						Delete
					</Button>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
