const Product = require("./../models/productModel");
const ErrorHandler = require("./../utils/errorHandler");
const asyncErrorHandler = require("./../middleware/asyncErrorHandler");
const orderModel = require("../models/orderModel");
const productModel = require("./../models/productModel");
exports.createOrder = asyncErrorHandler(async (req, res, next) => {
	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;
	const order = await orderModel.create({
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paidAt: Date.now(),
		user: req.user._id,
	});
	res.status(201).json({ success: true, order });
});

//getting single order
exports.getSingleOrder = asyncErrorHandler(async (req, res, next) => {
	const order = await orderModel
		.findById(req.params.id)
		//we use populate method to get all details fromt the user object id  sent from the order model
		// and then mongooose search that id in the user model and then returns the
		//name and email of that specific user
		.populate("user", "name email");
	if (!order) {
		return next(new ErrorHandler("Order Not Found ", 404));
	}
	res.status(200).json({ success: true, order });
});

//getting all order ordered by asingle user
exports.getLoggedInUserOrders = asyncErrorHandler(async (req, res, next) => {
	console.log(req.user);
	const orders = await orderModel.find({ user: req.user._id });
	res.status(200).json({
		success: true,
		totalOrders: orders.length,
		orders,
	});
});

//getting all orders only for admin
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
	const orders = await orderModel.find();

	//calculating total amount of all orders placed
	let totalAmount = 0;
	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});
	res.status(200).json({
		success: true,
		totalOrders: orders.length,
		totalAmount,
		orders,
	});
});

//updating the order status by admin
exports.updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
	const order = await orderModel.findById(req.params.id);
	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler("order is already dilivered"), 401);
	}
	order.orderItems.forEach(async (oI) => {
		await updateStock(oI.product, oI.quantity);
	});
	order.orderStatus = req.body.status;
	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}
	await order.save({ validateBeforeSave: false });
	res.status(200).json({ success: true });
});
async function updateStock(id, qty) {
	const product = await productModel.findById(id);
	product.stock -= qty;
	await product.save({ validateBeforeSave: false });
}
//deleting an Order
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
	const order = await orderModel.findByIdAndDelete(req.params.id);
	if (!order) {
		return next(new ErrorHandler("Order Not Found ", 404));
	}
	res.status(200).json({ success: true });
});
