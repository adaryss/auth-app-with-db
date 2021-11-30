export const getCurrentUserData = async (): Promise<any> => {
	try {
		const response = await fetch("/api/user", { method: "GET" });
		const json = await response.json();

		return json;
	} catch (e) {
		if (e instanceof Error) {
			throw e;
		}
	}
};
