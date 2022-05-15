import { useState } from "react";

export const useUpdateTodoStatus = () => {
	const [todoStateLoading, setTodoStateLoading] = useState(false);
	const [todoStateError, setTodoStateError] = useState(false);

	const handleUpdateTodoState = async (todoId: string) => {
		setTodoStateError(false);
		try {
			setTodoStateLoading(true);
			const response = await fetch("/api/todo", {
				method: "PATCH",
				body: JSON.stringify({ todoId }),
			});
			const json = await response.json();

			return json;
		} catch (e) {
			if (e instanceof Error) {
				setTodoStateError(true);
				throw e;
			}
		} finally {
			setTodoStateLoading(false);
		}
	};

	return {
		handleUpdateTodoState,
		todoStateLoading,
		todoStateError,
	};
};
