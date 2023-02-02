import express from "express";
const router = express.Router();
import authenticate from "../middleware/auth.js";
import { update } from "../services/authentication.js";
import { getCategories } from "../services/category.js";
import { getItems } from "../services/inventory.js";
import { addItem } from "../services/inventory.js";

router.get("/", authenticate, (req, res) => {
	res.send(req.rootUser);
});

router.get("/manage", authenticate, (req, res) => {
	res.send(req.rootUser);
});

router.post("/manage", async (req, res) => {
	try {
		const response = await update(req, res);
		res.status(200).send(response);
	} catch (err) {
		console.log(err);
	}
});

//inventory
router.get("/manage/inventory", authenticate, async (req, res) => {
	try {
		if (!req.rootUser) {
			return res.send(200).json({ error: "Token not found" });
		}
		const { email } = req.rootUser;
		const items = await getItems(email);
		res.status(200).json({ items: items, user: req.rootUser });
	} catch (err) {
		console.log(err);
	}
});

router.post("/manage/inventory", authenticate, async (req, res) => {
	try {
		const { item_name, category_name, price } = req.body;
		const { email } = req.rootUser;

		const addedItem = await addItem(
			{ item_name, category_name, price },
			email
		);

		res.status(200).json({ items: items, user: req.rootUser });
	} catch (err) {
		console.log(err);
	}
});

// category
router.get("/manage/inventory/category", authenticate, async (req, res) => {
	try {
		const categories = await getCategories();
		res.status(200).json({
			message: "Successfully sent categories",
			categories: categories,
		});
	} catch (err) {
		res.status(500).json({
			error: "Error while fetching the categories from the database",
		});
	}
});

export default router;
