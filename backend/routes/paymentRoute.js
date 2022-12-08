const express = require("express");
const {
	processPayment,
	sendStripeApiKey,
} = require("../controller/paymentController.js");
const router = express.Router();
const { isAuthenticated } = require("./../middleware/auth.js");
router.route("/processpayment").post(isAuthenticated, processPayment);
router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);
module.exports = router;
