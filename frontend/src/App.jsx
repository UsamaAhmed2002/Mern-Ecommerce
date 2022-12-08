import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import Home from "./components/Home/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NotFound from "./components/NotFound";
import SearchedProduct from "./components/SearchedProducts/SearchedProduct.jsx";
import AllProducts from "./components/AllProducts/AllProducts";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Account from "./components/Account/Account";
import { useEffect, useState } from "react";
import { getUserDetails } from "./actions/userLoginAction";
import { store } from "./Store";
import UserActions from "./components/UserActions/UserActions.jsx";
import { useSelector } from "react-redux";
import EditProfile from "./components/EditProfile/EditProfile";
import OrderDetails from "./components/Orders/Orders";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder.jsx";
import Success from "./components/Success/Success";
import StripePayment from "./components/Payment/StripePayment.jsx";
import AllOrders from "./components/MyOrders/MyOrders.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import AllProduct from "./components/Admin/Products/AllProducts.jsx";
import CreateProduct from "./components/Admin/CreateProduct/CreateProduct.jsx";
import EditProduct from "./components/Admin/EditProduct/EditProduct";
function App() {
	const { user, isAuthenticated, loading } = useSelector((state) => state.user);

	useEffect(() => {
		store.dispatch(getUserDetails());
	}, []);
	return (
		<Router>
			<Header />
			{isAuthenticated && <UserActions user={user} />}
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products/:id" element={<ProductDetails />} />
				<Route path="/products" element={<AllProducts />} />
				<Route path="/:keyword" element={<SearchedProduct />} />
				<Route path="/loginregister" element={<LoginRegister />} />
				<Route
					path="/account"
					element={<Account user={user} loading={loading} />}
				/>
				<Route path="/editprofile" element={<EditProfile />} />
				<Route
					path="/updatepassword"
					element={
						<ProtectedRoute>
							<UpdatePassword />
						</ProtectedRoute>
					}
				/>
				<Route path="/forgotpassword" element={<ForgotPassword />} />
				<Route path="/password/reset/:token" element={<ResetPassword />} />
				<Route path="/cart" element={<Cart />} />
				<Route
					path="/checkout"
					element={
						<ProtectedRoute>
							<Checkout />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/confirmorder"
					element={
						<ProtectedRoute>
							<ConfirmOrder />
						</ProtectedRoute>
					}
				/>

				<Route path="*" element={<NotFound />} />
				<Route
					path="/payment"
					element={
						<ProtectedRoute>
							<StripePayment />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/success"
					element={
						<ProtectedRoute>
							<Success />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/myorders"
					element={
						<ProtectedRoute>
							<AllOrders />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/myorders/:id"
					element={
						<ProtectedRoute>
							<OrderDetails />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/dashboard"
					isAdmin={true}
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/allproducts"
					isAdmin={true}
					element={
						<ProtectedRoute>
							<AllProduct />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/createproduct"
					isAdmin={true}
					element={
						<ProtectedRoute>
							<CreateProduct />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/editproduct/:id"
					isAdmin={true}
					element={
						<ProtectedRoute>
							<EditProduct />
						</ProtectedRoute>
					}
				/>
			</Routes>

			<Footer />
		</Router>
	);
}

export default App;
