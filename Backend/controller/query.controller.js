import prisma from "../database/dbConnect.js";

class QueryController {
	async createQuery(req, res) {
		try {
			const { email, name, query } = req.body;


			if (!email || !name || !query) {
				return res.status(400).json({ message: "All fields are required." });
			}

			const newQuery = await prisma.query.create({
				data: { email, name, query },
			});

			res.status(201).json({
				message: "Query successfully created",
				data: newQuery,
			});
		} catch (error) {
			console.error("Error creating query:", error);
			res.status(500).json({ message: "Server error" });
		}
	}
}

export const queryController = new QueryController();
