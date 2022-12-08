const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";
	// only for Wrong Mongo dB Id Error
	if (err.name === "CastError") {
		const message = `Rescource not fount , Invalid ${err.path}`;
		err = new ErrorHandler(message, 400);
	}
	res.status(err.statusCode).json({
		status: err.statusCode,
		message: err.message,
		stack: err.stack,
	});
};
