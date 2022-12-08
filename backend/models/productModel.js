const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a valid product name"],
		trim: true,
		unique: true,
	},
	productDescription: {
		type: String,
		required: [true, "Please enter a product description"],
	},
	price: {
		type: Number,
		required: [true, "Please enter a valid product price"],
		maxLength: [8, "Price cannot exceed 8 figures"],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
				trim: true,
			},
			url: {
				type: String,
				required: true,
				trim: true,
			},
		},
	],
	catagory: {
		type: String,
		required: [true, "Please select a category"],
		trim: true,
	},
	stock: {
		type: Number,
		required: [true, "Please enter a stock"],
		maxLength: [4, "Stock Cannot Exceed 4 CHaracters"],
		default: 1,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
			name: {
				type: String,
				trim: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				trim: true,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
});
module.exports = mongoose.model("Product", productSchema);
