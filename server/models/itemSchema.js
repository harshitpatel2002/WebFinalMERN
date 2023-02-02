import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const itemSchema = mongoose.Schema({
	item_id: {
		required: true,
		type: Number,
	},

	category: {
		type: {
			category_id: {
				type: Number,
				required: true,
			},
			category_name: {
				type: String,
			},
		},
	},

	item_name: {
		type: String,
	},

	price: {
		type: Number,
	},

	owner: {
		type: String,
		required: true,
	},
});

const Item = mongoose.model("items", itemSchema);

export default Item;
