const router = require("express").Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const Category = require("../models/Category");

// List categories (public)
router.get("/", async (req, res) => {
	const cats = await Category.find({}).sort({ name: 1 });
	res.send(cats);
});

// Create category (admin)
router.post("/", auth, isAdmin, async (req, res) => {
	try {
		let name = (req.body.name || "").trim();
		if (!name) return res.status(400).send({ message: "Category name is required" });
		name = name[0].toUpperCase() + name.slice(1);
		const created = await Category.create({ name });
		res.status(201).send(created);
	} catch (e) {
		if (e.code === 11000) return res.status(409).send({ message: "Category already exists" });
		res.status(400).send({ message: e.message });
	}
});

module.exports = router;
