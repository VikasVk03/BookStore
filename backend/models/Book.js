const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		bookTitle: { type: String, required: true, index: true },
		authorName: { type: String, required: true, index: true },
		description: { type: String },
		imageUrl: { type: String },
		// Deprecated: kept for backward compatibility with older documents/UI
		category: { type: String, index: true },
		// New multi-category support
		categories: { type: [String], index: true, default: undefined },
		price: { type: Number, default: 0 },
		pages: { type: Number },
		publisher: { type: String },
		publishedAt: { type: Date },
		averageRating: { type: Number, default: 0 },
		ratingsCount: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

bookSchema.index({ bookTitle: "text", authorName: "text", description: "text" });

module.exports = mongoose.model("Book", bookSchema);
