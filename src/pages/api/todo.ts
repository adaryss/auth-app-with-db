import ApiPrivateHandler from "ApiPrivateHandler";
import prismaClient from "db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const todo = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const bodyData = JSON.parse(req.body);
		const data = {
			title: bodyData.title,
			description: bodyData.description,
			priority: bodyData.priority,
			date: bodyData.date,
			done: bodyData.done,
		};
		console.log("data", data);
		try {
			const result = await prismaClient.todo.create({
				data: {
					...data,
					user: { connect: { uid: bodyData.userId } },
				},
			});
			console.log("result", result);
			return res.status(200).json({ message: "Success", data: result });
		} catch (err) {
			console.warn(err);
			return res.status(400).json({ err });
		}
	}

	if (req.method === "PATCH") {
		const bodyData = JSON.parse(req.body);

		try {
			const result = await prismaClient.todo.update({
				data: {
					done: true,
				},
				where: {
					id: bodyData.todoId,
				},
			});

			return res.status(200).json({ message: "Success", data: result });
		} catch (err) {
			console.warn(err);
			return res.status(400).json({ err });
		}
	}

	if (req.method === "DELETE") {
		const bodyData = JSON.parse(req.body);

		try {
			const result = await prismaClient.todo.delete({
				where: {
					id: bodyData.todoId,
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
export default ApiPrivateHandler(todo);
