import { useState } from "react";
import { Todo } from "src/pages/todos";

export const usePostNewTodo = () => {
	const [todosLoading, setTodosLoading] = useState(false);
	const [todosError, setTodosError] = useState(false);

	const handlePostNewTodo = async (todo: Todo, userId: string) => {
		setTodosError(false);
		try {
			setTodosLoading(true);
			const response = await fetch("/api/todo", {
				method: "POST",
				body: JSON.stringify({ ...todo, userId }),
			});
			const json = await response.json();

			return json;
		} catch (e) {
			if (e instanceof Error) {
				setTodosError(true);
				throw e;
			}
		} finally {
			setTodosLoading(false);
		}
	};

	return {
		handlePostNewTodo,
		todosLoading,
		todosError,
	};
};
