const express = require("express");
const {
	createOrder,
	getSingleOrder,
	getLoggedInUserOrders,
	getAllOrders,
	updateOrderStatus,
	deleteOrder,
} = require("../controller/orderController");
const { isAuthenticated, authorizeRoles } = require("./../middleware/auth");
const router = express.Router();
router.route("/orders").post(isAuthenticated, createOrder);
//get single order by that order id
router.route("/orders/:id").get(isAuthenticated, getSingleOrder);
//get alll orders of the logged in user
router.route("/myorders").get(isAuthenticated, getLoggedInUserOrders);
//get all orders for admin
router
	.route("/allorders")
	.get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

router
	.route("/updateorder/:id")
	.patch(isAuthenticated, authorizeRoles("admin"), updateOrderStatus);
router
	.route("/deleteorder/:id")
	.delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

module.exports = router;
