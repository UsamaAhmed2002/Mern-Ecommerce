const express = require("express");
const {
	registerUser,
	loginUser,
	logout,
	handleForgotPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	updateUserProfile,
	getAllUsers,
	getSingleUser,
	updateUserRole,
	deleteUser,
} = require("../controller/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(handleForgotPassword);
router.route("/password/reset/:token").patch(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/updatepassword").patch(isAuthenticated, updatePassword);
router.route("/me/update").patch(isAuthenticated, updateUserProfile);
router
	.route("/admin/getallusers")
	.get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router
	.route("/admin/user/:id")
	.get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
	.patch(isAuthenticated, authorizeRoles("admin"), updateUserRole)
	.delete(isAuthenticated, authorizeRoles("admin"), deleteUser);
module.exports = router;
