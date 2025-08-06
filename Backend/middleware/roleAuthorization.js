export async function isAdmin(req, res, next) {
	const { role } = req.user;

	if (role === "ADMIN") {
		next();
	} else {
		res.status(403).send("Access denied.");
	}
}

export async function isUser(req, res, next) {
	const { role } = req.user;

	if (role === "USER" || role === "ADMIN") {
		next();
	} else {
		res.status(403).send("Access denied.");
	}
}
