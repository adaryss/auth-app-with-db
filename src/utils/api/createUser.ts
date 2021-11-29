import { UserRole } from "src/contants/user";

interface NewUserData {
	readonly authUid?: string;
	readonly email?: string | null;
	readonly role: UserRole;
}

export const createUser = async ({
	authUid,
	email,
	role = UserRole.USER
}: NewUserData): Promise<any> => {
	if (!authUid || !email) {
		Promise.resolve();
	}
	try {
		const response = await fetch("/api/user", {
			method: "POST",
			body: JSON.stringify({ uid: authUid, email, role }),
		});
		const json = await response.json();

		return json;
	} catch (e) {
		if (e instanceof Error) {
			throw e;
		}
	}
};
