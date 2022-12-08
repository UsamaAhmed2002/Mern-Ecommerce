const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//controller for user registration
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "this is a sample id",
			url: "avatar url",
		},
	});
	//sending token to the cookie declaration function
	sendToken(user, 201, res);
});

//controller for login user
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(
			new ErrorHandler("Please enter a valid email or password", 400)
		);
	}

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}
	const isPasswordMatched = await user.matchPassword(password);
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Email or Password not matched", 400));
	}

	//sending token to the cookie declaration function
	sendToken(user, 200, res);
});
exports.logout = asyncErrorHandler(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	res.status(200).json({
		status: "success",
		message: "Logged out successfully",
	});
});
//handler for when a user clicks forgot password and request a  passqord reset
exports.handleForgotPassword = asyncErrorHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	//Get Reset Password Token
	const resetToken = user.newresetpasswordtoken();
	await user.save({ validateBeforeSave: false });
	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/password/reset/${resetToken}`;
	const message = `Your Password Reset Link is :- <br/>
	  ${resetPasswordUrl} <br/>
	if u havn't sent the req plz ignore this msg
	`;
	try {
		await sendEmail({
			email: user.email,
			subject: "SamaEcom Password Recovery",
			message,
		});
		res.status(200).json({
			status: "success",
			message: `email sent successfully to ${user.email}`,
		});
	} catch (e) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(e.message, 500));
	}
});

// now creating a contoller when the user successfully gets the reset
// password link  and now clicks that link

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
	//getting the token from the url and hashing it
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});
	if (!user) {
		return next(
			new ErrorHandler(
				"Reset Password Token is invalid or has been expired",
				404
			)
		);
	}
	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Passwords did not matched", 400));
	}
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();
	sendToken(user, 200, res);
});
// Get User Detail
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
	console.log(req.user);
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// update User password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	const isPasswordMatched = await user.matchPassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Old password is incorrect", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler("password does not match", 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

//update user profile
exports.updateUserProfile = asyncErrorHandler(async (req, res, next) => {
	const userData = {
		name: req.body.name,
		email: req.body.email,
	};
	//we will add cloudinary later
	const user = await User.findByIdAndUpdate(req.user.id, userData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
	});
});

//get all users (only for admin routes)
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		status: "success",
		totalUsers: users.length,
		usersData: users,
	});
});
//get single user (only for admin)
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	res.status(200).json({
		status: "success",
		user,
	});
});
//Updating user role
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {
	const userData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};
	const user = await User.findByIdAndUpdate(req.params.id, userData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	res.status(200).json({
		status: "success",
		user,
	});
});
//deleting a user by admin
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	res.status(200).json({
		status: "success",
		message: "User deleted successfully",
	});
});
