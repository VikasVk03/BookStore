const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/register", [body("name").isLength({ min: 1 }), body("email").isEmail(), body("password").isLength({ min: 6 })], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	const { name, email, password } = req.body;
	try {
		const exists = await User.findOne({ email });
		if (exists) return res.status(409).send({ message: "Email already registered" });
		const passwordHash = await bcrypt.hash(password, 10);
		const role = process.env.ADMIN_EMAIL && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() ? "admin" : "user";
		const user = await User.create({ name, email, passwordHash, role });
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
		res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
		res.send({ id: user._id, name: user.name, email: user.email, role: user.role });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
});

router.post("/login", [body("email").isEmail(), body("password").isLength({ min: 6 })], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(401).send({ message: "Invalid credentials" });
		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) return res.status(401).send({ message: "Invalid credentials" });
		const role = user.role || (process.env.ADMIN_EMAIL && user.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() ? "admin" : "user");
		if (user.role !== role) {
			user.role = role;
			await user.save();
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
		res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
		res.send({ id: user._id, name: user.name, email: user.email, role: user.role });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
});

router.get("/me", auth, async (req, res) => {
	const user = await User.findById(req.user.id).select("name email favorites role");
	res.send(user);
});

router.post("/logout", (req, res) => {
	res.clearCookie("token");
	res.send({ success: true });
});

module.exports = router;
