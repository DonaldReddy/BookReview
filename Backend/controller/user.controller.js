import { userService } from "../service/user.service.js";

class UserController {
	createUser = async (req, res) => {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				return res.status(400).send("All fields are required");
			}

			const user = await userService.createUser({ name, email, password });
			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};

	getUser = async (req, res) => {
		try {
			const { id } = req.params;
			if (!id) {
				return res.status(400).send("User ID is required");
			}

			const user = await userService.findUserById(id);
			if (!user) {
				return res.status(404).send("User not found");
			}

			res.status(200).json(user);
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};

	updateUser = async (req, res) => {
		try {
			const { id } = req.params;
			const { name, email } = req.body;


			if (!id) {
				return res.status(400).send("User ID is required");
			}

			if (!name && !email) {
				return res
					.status(400)
					.send("At least one field (name or email) is required to update");
			}

			const updatedUser = await userService.updateUser(id, {
				name,
				email,
			});
			if (!updatedUser) {
				return res.status(404).send("User not found");
			}

			res.status(200).json(updatedUser);
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};
}

export const userController = new UserController();
