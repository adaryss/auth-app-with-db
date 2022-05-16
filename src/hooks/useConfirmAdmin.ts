import { useState } from "react";
export const useConfirmAdmin = () => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [confirmError, setConfirmError] = useState(false);

	const handleConfirmAdmin = async (userId: string) => {
		setConfirmError(false);
		try {
			const response = await fetch("/api/confirm", {
				method: "PATCH",
				body: JSON.stringify({
					userId,
				}),
			});
			const json = await response.json();

			return json;
		} catch (e) {
			if (e instanceof Error) {
				setConfirmError(true);
				throw e;
			}
		} finally {
			setConfirmLoading(false);
		}
	};

	return {
		handleConfirmAdmin,
		confirmLoading,
		confirmError,
	};
};
