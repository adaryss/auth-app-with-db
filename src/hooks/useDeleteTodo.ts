import { useState } from "react";

export const useDeleteTodo = () => {
	const [todoDeleteLoading, setTodoLoading] = useState(false);
	const [todoDeleteError, setTodoDeleteError] = useState(false);

	const handleDeleteTodo = async (todoId: string) => {
		setTodoDeleteError(false);
		try {
			setTodoLoading(true);
			const response = await fetch("/api/todo", {
				method: "DELETE",
				body: JSON.stringify({ todoId }),
			});
			const json = await response.json();

			return json;
		} catch (e) {
			if (e instanceof Error) {
				setTodoDeleteError(true);
				throw e;
			}
		} finally {
			setTodoLoading(false);
		}
	};

	return {
		handleDeleteTodo,
		todoDeleteLoading,
		todoDeleteError,
	};
};
