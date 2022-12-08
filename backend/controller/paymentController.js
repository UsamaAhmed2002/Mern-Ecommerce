const asyncErrorHandler = require("./../middleware/asyncErrorHandler");
const stripe = require("stripe")(process.env.stripepss);
exports.processPayment = asyncErrorHandler(async (req, res, next) => {
	const mypayment = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: "usd",
		metadata: {
			company: "SamaEcom",
		},
	});
	res.status(200).json({
		success: true,
		client_secret: mypayment.client_secret,
	});
});

//sendig stripe api key to frontend
exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
	res.status(200).json({
		success: true,
		stripeApiKey: process.env.stripeapikey,
	});
});
