import Category from "../models/categorySchema.js";

export const getCategories = async () => {
	try {
		const fetchedCategories = await Category.find((error, results) => {
			if (error) {
				console.log("Error in FETCHING");
			}
		}).clone();
		// console.log("Categories: ", fetchedCategories);
		return fetchedCategories;
	} catch (error) {
		console.log(error);
	}
};

export const getCatIdByName = async (category_name) => {
	try {
		const category = Category.findOne({ category_name });
		return category.category_id;
	} catch (error) {
		console.log(error);
	}
};
