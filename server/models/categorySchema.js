import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
	{
		category_id: {
			type: Number,
			required: true,
		},
		category_name: {
			type: String,
		},
	},
	{ collection: "category" }
);

const Category = mongoose.model("category", categorySchema);
export default Category;
