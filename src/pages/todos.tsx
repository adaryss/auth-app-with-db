import Layout from "src/components/Layout";
import { parseCookies } from "nookies";
import { firebaseAdmin } from "firebaseAdmin";
import { AUTH_USER_ID, USER_ID_TOKEN } from "src/contants/cookies";
import { GetServerSidePropsContext } from "next";

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

const Todos = () => {
	return <Layout>My todos</Layout>;
};

export default Todos;
