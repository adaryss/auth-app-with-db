import { getCurrentUserData } from "src/utils/api/getCurrentUserData";
import useSWR from "swr";

export const useGetCurrentUserData = (uid?: string) => {
	const { data, error } = useSWR(
		["getCurrentUserData", uid],
		getCurrentUserData
	);

	return {
		data,
		error,
		isLoading: (!error && !data),
	};
};
