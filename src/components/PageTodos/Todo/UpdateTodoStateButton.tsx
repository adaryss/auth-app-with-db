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
import { CheckIcon } from "@chakra-ui/icons";
import { Todo as TodoType } from "src/pages/todos";

interface UpdateTodoStateButtonProps {
	readonly todo: TodoType;
	readonly handleDoneTodo: (id: string) => void;
	readonly todoStateLoading: boolean;
}

export const UpdateTodoStateButton: FC<UpdateTodoStateButtonProps> = ({
	todo,
	handleDoneTodo,
	todoStateLoading,
}) => {
	return (
		<Popover>
			<PopoverTrigger>
				<Tag
					size="md"
					variant="solid"
					borderRadius="full"
					cursor="pointer"
					mr="2"
				>
					<TagLeftIcon boxSize="12px" as={CheckIcon} />
					<TagLabel>Done</TagLabel>
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
					<Box>Are you sure you want to mark this todo as done?</Box>
					<Button
						type="button"
						mt="4"
						colorScheme="green"
						onClick={() => handleDoneTodo(todo.id ?? "")}
						disabled={todoStateLoading}
					>
						Done
					</Button>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
