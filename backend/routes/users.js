const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Add to favorites
router.post("/me/favorites/:bookId", auth, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorites: req.params.bookId } }, { new: true }).populate("favorites");
		res.send(user.favorites);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

// Remove from favorites
router.delete("/me/favorites/:bookId", auth, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: req.params.bookId } }, { new: true }).populate("favorites");
		res.send(user.favorites);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

// List favorites
router.get("/me/favorites", auth, async (req, res) => {
	const user = await User.findById(req.user.id).populate("favorites");
	res.send(user.favorites);
});

module.exports = router;
