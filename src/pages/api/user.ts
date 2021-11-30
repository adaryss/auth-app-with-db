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

				res.status(200).json({ user });
			} catch (err) {
				res.status(400).json({ err });
			}
		} else {
			res.status(201).json({ message: 'Not logged in!' });
		}
	}

	if (req.method === "POST") {
		try { 
			await prismaClient.user.create({
				data: JSON.parse(req.body),
			});

			res.status(200).json({ message: "Success" });
		} catch (err) {
			res.status(400).json({ err });
		}
	}
};

export default ApiPrivateHandler(user);
