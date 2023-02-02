// all the functions related to the user's authentication

// importing the models
import User from "../models/userSchema.js";

export const login = async (req, res) => {
	try {
		let { email, password } = req.body;

		if (email === "" || password === "") {
			return res.status(400).json({ error: "Invalid credentials" });
		}
		let response = await User.findOne({ email: email });

		if (!response) {
			return res
				.status(400)
				.json({ error: "Please enter valid credentials" });
		}

		if (password === response.password) {
			const token = await response.generateAuthToken();

			res.cookie("cookiesToken", token, {
				expires: new Date(Date.now() + 900000),
				httpOnly: true,
			});

			// Currently not added the token into the array of tokens

			return res.status(200).json({ message: "Login successful" });
		}
		// console.log(response);
	} catch (err) {
		console.log(err);
	}
};

export const register = async (req, res) => {
	try {
		const { email, fName, lName, password } = req.body;

		if (!email || !fName || !lName || !password) {
			return res.status(400).json({
				error: "Please enter all the credentials to register",
			});
		}

		let emailExist = await User.findOne({ email: email });

		if (emailExist) {
			return res
				.status(400)
				.json({ error: "User already exists in the database" });
		}

		const newUser = new User({ email, fName, lName, password });
		/*
			Now I have my user ready. Before storing it into the database, I want to generate a authentication token for the user.
		*/

		const token = await newUser.generateAuthToken();

		//Cookies
		res.cookie("cookiesToken", token, {
			// expires: new Date(Date.now() + 900000),
			httpOnly: true,
		});

		const registered = await newUser.save();

		console.log(registered);

		res.status(200).json({
			message: "User registered successfully",
			token: token,
		});
	} catch (error) {
		console.log(error);
	}
};

export const update = async (req, res) => {
	try {
		const { email, fName, lName, password } = req.body;

		if (!email || !fName || !lName || !password) {
			return res.status(400).json({
				error: "Please enter all the credentials to register",
			});
		}

		let emailExist = await User.findOne({ email: email });

		if (!emailExist) {
			return res.status(400).json({
				error: "Email does not exist. Register the user first",
			});
		}

		let updateUser = await User.updateOne(
			{ email },
			{ $set: { fName: fName, lName: lName, password: password } }
		);

		res.status(200).json({
			message: "User updated successfully",
			updatedUser: updateUser,
		});
	} catch (error) {
		console.log(error);
	}
};
