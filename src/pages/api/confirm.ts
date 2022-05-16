import ApiPrivateHandler from "ApiPrivateHandler";
import prismaClient from "db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const confirm = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "PATCH") {
		const bodyData = JSON.parse(req.body);

		try {
			const result = await prismaClient.user.update({
				data: {
					isAdminConfirmed: true,
				},
				where: {
					uid: bodyData.userId,
				},
			});

			return res.status(200).json({ message: "Success", data: result });
		} catch (err) {
			console.warn(err);
			return res.status(400).json({ err });
		}
	}

	return res.status(405).json({ messages: "Method not allowed" });
};

export default ApiPrivateHandler(confirm);