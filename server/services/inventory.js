import Item from "../models/itemSchema.js";

export const getItems = async (email) => {
	const fetchedItems = await Item.find({ email });
	console.log(fetchedItems);
	return fetchedItems;
};

export const addItem = async ({ item_name, category_name, price }, email) => {
	const newItem = new Item({
		item_name: item_name,
		category: {
			category_name: category_name,
			category_id: category_id,
		},
		price: price,
		email: email,
	});

	const savedItem = newItem.save();
	console.log("Printing the saved item ", savedItem);
};
