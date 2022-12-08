const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please enter a valid name"],
		trim: true,
		maxLength: [30, "name cannot exceed 30 characters"],
		minLength: [5, "name should be more than  5characters"],
	},
	email: {
		type: String,
		required: [true, "please enter an email address"],
		unique: true,
		validate: [validator.isEmail, "Please enter a valid email address"],
	},
	password: {
		type: String,
		required: [true, "please enter a valid password"],
		minLength: [8, "Password should be greater than 8 characters"],
		maxLength: [20, "Password cannot exceed 20 characters"],
		select: false,
	},
	avatar: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	role: {
		type: String,
		required: true,
		default: "user",
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});
//hashing password before the user is saved
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});
//creating a jwt token for the user
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.jwtsecret, {
		expiresIn: process.env.jwtexpire,
	});
};
//matching password for logging in user
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
//generting reset password token
userSchema.methods.newresetpasswordtoken = function () {
	//Generating Token
	const Token = crypto.randomBytes(20).toString("hex");
	//hashing and adding reset password token to userSchema
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(Token)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
	return Token;
};
module.exports = mongoose.model("User", userSchema);
