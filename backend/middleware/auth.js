const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function auth(req, res, next) {
	const token = req.cookies.token || (req.headers.authorization || "").replace("Bearer ", "");
	if (!token) return res.status(401).send({ message: "Unauthorized" });
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(payload.id).select("_id role");
		if (!user) return res.status(401).send({ message: "Unauthorized" });
		req.user = { id: user._id.toString(), role: user.role };
		return next();
	} catch (e) {
		return res.status(401).send({ message: "Invalid token" });
	}
};
