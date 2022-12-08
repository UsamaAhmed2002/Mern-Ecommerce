const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
	shippingInfo: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, required: true },
		pincode: {
			type: Number,
			required: true,
		},
		phone: {
			type: Number,
			required: true,
		},
	},
	orderItems: [
		{
			name: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			qty: {
				type: Number,
				required: true,
			},
			img: {
				type: String,
				required: true,
			},
			_id: {
				type: mongoose.Schema.ObjectId,
				ref: "Product",
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	paymentInfo: {
		id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	paidAt: {
		type: Date,
		required: true,
	},
	itmesPrice: {
		type: Number,
		default: 0,
		required: true,
	},
	taxPrice: {
		type: Number,
		default: 0,
		required: true,
	},
	shippingPrice: {
		type: Number,
		default: 0,
		required: true,
	},
	totalPrice: {
		type: Number,
		default: 0,
		required: true,
	},
	orderStatus: {
		type: String,
		required: true,
		default: "processing",
	},
	deliveredAt: Date,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
module.exports = mongoose.model("Order", orderSchema);
