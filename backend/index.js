const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
	cors({
		origin: allowedOrigin,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("BookStore API is running");
});

// Database connection
const mongoose = require("mongoose");
mongoose
	.connect(process.env.MONGODB_URI, {
		dbName: process.env.MONGODB_DB || "BookInventory",
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => {
		console.error("MongoDB connection error", err);
		process.exit(1);
	});

// Models
const Book = require("./models/Book");

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/users", require("./routes/users"));
app.use("/api/categories", require("./routes/categories"));

// Backward-compatible legacy endpoints used by current frontend
app.post("/upload-book", async (req, res) => {
	try {
		const payload = { ...req.body };
		if (!payload.categories && typeof payload.category === "string" && payload.category.length) {
			payload.categories = payload.category
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean);
		}
		const book = await Book.create(payload);
		res.send(book);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

app.get("/all-books", async (req, res) => {
	try {
		const { category, categories, q } = req.query;
		const filters = {};
		let categoryList = [];
		if (Array.isArray(categories)) categoryList = categories;
		else if (typeof categories === "string" && categories.length) categoryList = categories.split(",");
		else if (typeof category === "string" && category.length) categoryList = category.split(",");
		if (categoryList.length) {
			filters.$or = [{ categories: { $in: categoryList } }, { category: { $in: categoryList } }];
		}
		if (q) filters.$text = { $search: q };
		const books = await Book.find(filters).sort({ createdAt: -1 });
		res.send(books);
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
});

app.get("/book/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) return res.status(404).send({ message: "Book not found" });
		res.send(book);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

app.patch("/book/:id", async (req, res) => {
	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!book) return res.status(404).send({ message: "Book not found" });
		res.send(book);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

app.delete("/book/:id", async (req, res) => {
	try {
		const deleted = await Book.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send({ message: "Book not found" });
		res.send({ success: true });
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
