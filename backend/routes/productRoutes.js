const express = require("express");
const {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
	createReview,
	getAllReviews,
	deleteProductReview,
	getAdminProducts,
} = require("../controller/productContoller");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/products").get(getAllProducts);
router
	.route("/admin/products")
	.post(isAuthenticated, authorizeRoles("admin"), createProduct)
	.get(isAuthenticated, authorizeRoles("admin"), getAdminProducts);
router
	.route("/admin/products/:id")
	.patch(isAuthenticated, authorizeRoles("admin"), updateProduct)
	.delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);
router.route("/products/review").patch(isAuthenticated, createReview);
router
	.route("/products/review/:id")
	.get(getAllReviews)
	.delete(isAuthenticated, deleteProductReview);

module.exports = router;
