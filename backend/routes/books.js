const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const Book = require("../models/Book");

router.get("/", async (req, res) => {
	try {
		const { category, categories, q, sort = "-createdAt" } = req.query;
		const filters = {};
		let categoryList = [];
		if (Array.isArray(categories)) categoryList = categories;
		else if (typeof categories === "string" && categories.length) categoryList = categories.split(",");
		else if (typeof category === "string" && category.length) categoryList = category.split(",");
		if (categoryList.length) {
			filters.$or = [{ categories: { $in: categoryList } }, { category: { $in: categoryList } }];
		}
		if (q) filters.$text = { $search: q };
		const books = await Book.find(filters).sort(sort);
		res.send(books);
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) return res.status(404).send({ message: "Book not found" });
		res.send(book);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

router.post("/", auth, isAdmin, [body("bookTitle").isLength({ min: 1 }), body("authorName").isLength({ min: 1 })], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	try {
		const payload = { ...req.body };
		if (!payload.categories && typeof payload.category === "string" && payload.category.length) {
			payload.categories = payload.category
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean);
		}
		if (Array.isArray(payload.categories)) {
			payload.categories = payload.categories.map((s) => String(s).trim()).filter(Boolean);
		}
		const created = await Book.create(payload);
		res.status(201).send(created);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

router.patch("/:id", auth, isAdmin, async (req, res) => {
	try {
		const payload = { ...req.body };
		if (!payload.categories && typeof payload.category === "string" && payload.category.length) {
			payload.categories = payload.category
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean);
		}
		if (Array.isArray(payload.categories)) {
			payload.categories = payload.categories.map((s) => String(s).trim()).filter(Boolean);
		}
		const updated = await Book.findByIdAndUpdate(req.params.id, payload, {
			new: true,
			runValidators: true,
		});
		if (!updated) return res.status(404).send({ message: "Book not found" });
		res.send(updated);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
	try {
		const deleted = await Book.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send({ message: "Book not found" });
		res.send({ success: true });
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

module.exports = router;
