const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./asyncErrorHandler");

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
	//fetching the jwt token from the cookie
	const { token } = req.cookies;
	if (!token) return next(new ErrorHandler("plz log in first ", 400));
	//verifying the given token matches the jwt stored token
	const decodedData = jwt.verify(token, process.env.jwtsecret);
	req.user = await userModel.findById(decodedData.id);
	next();
});
exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler("Only Admin is allowed to access these resources", 403)
			);
		}
		next();
	};
};
