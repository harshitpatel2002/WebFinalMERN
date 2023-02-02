import express from "express";
const router = express.Router();

import { register } from "../services/authentication.js";

router.post("/", async (req, res) => {
	let isRegistered = await register(req, res);
	res.send(isRegistered);
});

export default router;
