import ApiPrivateHandler from "ApiPrivateHandler";
import prismaClient from "db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		const { authUserId = "" } = parseCookies({ req });
		if (authUserId.length > 0) {
			try {
				const user = await prismaClient.user.findFirst({
					where: {
						uid: authUserId,
					},
				});

				return res.status(200).json({ user });
			} catch (err) {
				return res.status(400).json({ err });
			}
		} else {
			return res.status(201).json({ message: "Not logged in!" });
		}
	}

	if (req.method === "POST") {
		try {
			await prismaClient.user.create({
				data: JSON.parse(req.body),
			});

			return res.status(200).json({ message: "Success" });
		} catch (err) {
			return res.status(400).json({ err });
		}
	}

	return res.status(405).json({ messages: "Method not allowed" });
};

export default ApiPrivateHandler(user);
