import jsonwebtoken from "jsonwebtoken";
import User from "../models/userSchema.js";

const authenticate = async (req, res, next) => {
	try {
		const token = req.cookies["cookiesToken"];
		const verified = jsonwebtoken.verify(token, process.env.SECRET_KEY);

		const user = await User.findOne({ _id: verified._id });

		if (!user) {
			throw new Error("User not found");
		}

		req.token = token;
		req.rootUser = user;
		req.userId = user._id;

		next();
	} catch (error) {
		res.status(401).json({
			error: "Unauthorized access found. Directing to login",
		});
	}
};

export default authenticate;
