import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
	Textarea,
	Radio,
	RadioGroup,
	Stack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Priority } from "src/pages/todos";
import { TodoDetailsButton } from "./TodoDetailsButton";

interface TodosFormProps {
	readonly handleAddTodo: (e: React.FormEvent<Element>) => void;
	readonly handleClearDetail: () => void;
	readonly todoRef: React.RefObject<HTMLInputElement>;
	readonly todoDetailRef: React.RefObject<HTMLTextAreaElement>;
	readonly hasMoreInfo: boolean;
	readonly setMoreInfo: React.Dispatch<React.SetStateAction<boolean>>;
	readonly prio: Priority;
	readonly setPrio: React.Dispatch<React.SetStateAction<Priority>>;
}

export const TodosForm: FC<TodosFormProps> = ({
	handleAddTodo,
	todoRef,
	hasMoreInfo,
	todoDetailRef,
	handleClearDetail,
	setMoreInfo,
	prio,
	setPrio,
}) => {
	return (
		<form onSubmit={handleAddTodo}>
			<Box my={4} textAlign="left">
				<FormControl as="fieldset">
					<FormControl>
						<Input
							ref={todoRef}
							type="text"
							placeholder="New todo?"
							isRequired
						/>
					</FormControl>
					<Box mt="4" display={hasMoreInfo ? "block" : "none"}>
						<FormControl>
							<Textarea minHeight="215" ref={todoDetailRef} />
						</FormControl>
					</Box>
					<TodoDetailsButton
						hasMoreInfo={hasMoreInfo}
						handleClearDetail={handleClearDetail}
						setMoreInfo={setMoreInfo}
					/>
					<Box mt={4}>
						<FormLabel>Priority</FormLabel>
						<RadioGroup
							onChange={(val: Priority) => setPrio(val)}
							value={prio}
						>
							<Stack direction="row">
								<Radio value={Priority.LOW}>Low</Radio>
								<Radio value={Priority.MEDIUM}>Mid</Radio>
								<Radio value={Priority.HIGH}>High</Radio>
							</Stack>
						</RadioGroup>
					</Box>
					<Button type="submit" width="full" mt={8}>
						Add
					</Button>
				</FormControl>
			</Box>
		</form>
	);
};
