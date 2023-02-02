import express from "express";
import authenticate from "../middleware/auth.js";
const router = express.Router();

// importing the functions from services
import { login } from "../services/authentication.js";

router.get("/", authenticate, async (req, res) => {
	res.status(200).json({
		message: "Token found. Redirecting to home",
		user: req.rootUser,
	});
});

router.post("/", async (req, res) => {
	try {
		return await login(req, res);
	} catch (err) {
		console.log(err);
	}
});

export default router;
