import { Box, HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React, { FC } from "react";

interface TodoDetailProps {
	readonly handleClearDetail: () => void;
	readonly hasMoreInfo: boolean;
	readonly setMoreInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoDetailsButton: FC<TodoDetailProps> = ({
	handleClearDetail,
	hasMoreInfo,
	setMoreInfo,
}) => (
	<>
		{hasMoreInfo ? (
			<Box mt="4">
				<HStack
					cursor="pointer"
					mt="2"
					spacing={4}
					justify="center"
					onClick={handleClearDetail}
				>
					<Tag size="md" borderRadius="full" variant="solid">
						<TagLabel>Clear</TagLabel>
						<TagCloseButton />
					</Tag>
				</HStack>
			</Box>
		) : (
			<HStack
				cursor="pointer"
				mt="2"
				spacing={4}
				justify="center"
				onClick={() => setMoreInfo(true)}
			>
				<Tag
					size="md"
					variant="solid"
					borderRadius="full"
					colorScheme="cyan"
				>
					<TagCloseButton transform="rotate(45deg)" m="0" mr="4px" />
					<TagLabel>Add detail Info</TagLabel>
				</Tag>
			</HStack>
		)}
	</>
);
