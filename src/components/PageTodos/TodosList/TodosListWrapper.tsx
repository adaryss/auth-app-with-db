import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

export const TodosListWrapper: FC = ({ children }) => {
	return (
		<Flex
			width="60%"
			align="center"
			justifyContent="center"
			mt="8"
			position="relative"
		>
			<Box width="full" p={2}>
				{children}
			</Box>
		</Flex>
	);
};
