import mongoose from "mongoose";

const connectToMongo = async () => {
	const uri =
		"mongodb+srv://admin:Hsp123456@cluster0.nwc71rk.mongodb.net/finalproject?retryWrites=true&w=majority";

	mongoose.set("strictQuery", false);
	try {
		await mongoose.connect(uri, { useNewUrlParser: true });
		console.log("Connected to the DB");
	} catch (error) {
		console.log("Not able to connect to the DB");
	}
};

export default connectToMongo;
