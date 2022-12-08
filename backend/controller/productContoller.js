const Product = require("./../models/productModel");
const ErrorHandler = require("./../utils/errorHandler");
const asyncErrorHandler = require("./../middleware/asyncErrorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinray = require("cloudinary");
//creating a new product (only for admin)
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
	let images = [];
	if (typeof req.body.images === "string") {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}
	const imagesLink = [];

	for (let i = 0; i < images.length; i++) {
		const result = await cloudinray.v2.uploader.upload(images[i], {
			folder: "products",
		});
		imagesLink.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLink;
	req.body.user = req.user.id;
	//creating a product from product schema
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
});
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
	const resultPerPage = 5;
	const apiFeatures = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);
	const products = await apiFeatures.query;
	res.status(200).json({
		status: "success",
		results: products.length,
		products,
		resultPerPage,
	});
});

//get all products for admin
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
	const resultPerPage = 5;
	const products = await Product.find();
	res.status(200).json({
		status: "success",
		results: products.length,
		products,
		resultPerPage,
	});
});

//get single product details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
	const id = req.params.id;
	const product = await Product.findOne({ _id: id });
	res.status(200).json({
		product,
	});
});
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindandModify: false,
	});
	res.status(200).json({
		status: "Product updated",
		product,
	});
});
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.id);
	res.status(200).json({
		success: true,
	});
});
//handler for creating or updating a product review
exports.createReview = asyncErrorHandler(async (req, res, next) => {
	const { rating, comment, productid } = req.body;
	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};
	const product = await Product.findById(productid);
	const isReviewed = product.reviews.find(
		(rev) => rev._id.toString() === req.user._id.toString()
	);
	if (isReviewed) {
		product.reviews.forEach((rev) => {
			if (rev.user.toString() === req.user._id.toString())
				(rev.rating = rating), (rev.comment = comment);
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}
	//calculating avg ratings of a product
	let avg = 0;
	product.reviews.forEach((rev) => {
		avg += rev.rating;
	});
	product.ratings = avg / product.reviews.length;
	await product.save({ validateBeforeSave: false });
	res.status(200).json({
		success: true,
	});
});
//geting all reviews of a product
exports.getAllReviews = asyncErrorHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("product not found"), 404);
	}
	res.status(200).json({
		status: "success",
		reviews: product.reviews,
	});
});
//deleting a product review
exports.deleteProductReview = asyncErrorHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("product not found"), 404);
	}
	const reviews = product.reviews.filter(
		(review) => review._id.toString() !== req.query.id
	);

	let avg = 0;

	reviews.forEach((rev) => {
		avg += rev.rating;
	});

	let ratings = 0;

	if (reviews.length === 0) {
		ratings = 0;
	} else {
		ratings = avg / reviews.length;
	}

	const numOfReviews = reviews.length;
	await Product.findByIdAndUpdate(
		req.params.id,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFinfAndmodify: false,
		}
	);
	res.status(200).json({
		status: "success",
		mesage: "review deleted successfully",
	});
});
