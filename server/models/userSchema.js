import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const userSchema = mongoose.Schema({
	email: {
		required: true,
		type: String,
	},

	password: {
		type: String,
	},

	fName: {
		type: String,
	},

	lName: {
		type: String,
	},

	/*
        We need an array of tokens because every time the use logins we generate a new token
    */
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// Generating the JWT token
/*
    Reason we have used normal function is that function represents the object that called the function.Here we want the user's id to generate a web token.
    Arrow function's this represents the owner that we don't want
*/

userSchema.methods.generateAuthToken = async function () {
	try {
		// Generated a new token
		let generatedToken = jsonwebtoken.sign(
			{ _id: this._id },
			process.env.SECRET_KEY,
			{ expiresIn: "2 hours" }
		);

		// Added the token into user model
		this.tokens = this.tokens.concat({ token: generatedToken });

		// saving the token
		await this.save();

		return generatedToken;
	} catch (error) {
		console.log(error);
	}
};

const User = mongoose.model("users", userSchema);

export default User;
