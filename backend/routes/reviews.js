const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Review = require("../models/Review");
const Book = require("../models/Book");

router.get("/book/:bookId", async (req, res) => {
	try {
		const reviews = await Review.find({ book: req.params.bookId }).populate("user", "name").sort("-createdAt");
		res.send(reviews);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

router.post("/book/:bookId", auth, [body("rating").isInt({ min: 1, max: 5 })], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	try {
		const { rating, comment } = req.body;
		const review = await Review.findOneAndUpdate(
			{ book: req.params.bookId, user: req.user.id },
			{ rating, comment },
			{ upsert: true, new: true, runValidators: true }
		);

		// Recalculate book rating
		const stats = await Review.aggregate([
			{ $match: { book: review.book } },
			{ $group: { _id: "$book", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
		]);
		if (stats.length) {
			await Book.findByIdAndUpdate(review.book, {
				averageRating: Number(stats[0].avg.toFixed(2)),
				ratingsCount: stats[0].count,
			});
		}

		res.status(201).send(review);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

module.exports = router;
