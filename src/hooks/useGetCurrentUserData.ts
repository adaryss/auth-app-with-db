import { getCurrentUserData } from "src/utils/api/getCurrentUserData";
import useSWR from "swr";

export const useGetCurrentUserData = () => {
	const { data, error } = useSWR("getCurrentUserData", getCurrentUserData);

	return {
		data,
		error,
		isLoading: !error && !data,
	};
};
