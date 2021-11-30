import { firebaseAdmin } from "firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import Layout from "src/components/Layout";
import { AUTH_USER_ID, USER_ID_TOKEN } from "src/contants/cookies";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const userIdToken = parseCookies(ctx)[USER_ID_TOKEN];
	const userId = parseCookies(ctx)[AUTH_USER_ID];

	if (userIdToken && userId) {
		try {
			const currentUser = await firebaseAdmin
				.auth()
				.verifyIdToken(userIdToken);

			return {
				props: {
					data: null,
				},
			};
		} catch (err) {
			return {
				redirect: {
					permanent: false,
					destination: "/login",
				},
				props: {
					data: null,
				},
			};
		}
	}

	return {
		redirect: {
			permanent: false,
			destination: "/login",
		},
		props: {
			data: null,
		},
	};
};

const Overview = () => {
	return <Layout>List of all todos</Layout>;
};

export default Overview;
