import { Container } from "@mui/system";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GetOrderDetails } from "../../actions/OrderActions";
import Loader from "../Loader/Loader";
import "./Orders.css";
const OrderDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const {
		order,
		error,
		isLoading = true,
	} = useSelector((state) => state.OrderDetails);
	useEffect(() => {
		if (error) return toast.error(error);
		dispatch(GetOrderDetails(id));
	}, [dispatch, id, error]);
	return (
		<Fragment>
			{isLoading ? (
				<Loader />
			) : (
				<div className="OrderDetailsPageConatainer">
					<div className="OrderInfo">
						<h1>Order Number</h1>
						<p>{order._id}</p>
					</div>
					<div className="shippingInfo">
						<h1>Shipping Info</h1>
						<p>Address: {order.shippingInfo.address}</p>
						<p>City: {order.shippingInfo.city}</p>
						<p>State: {order.shippingInfo.state}</p>
						<p>Country: {order.shippingInfo.country}</p>
						<p>Pincode: {order.shippingInfo.pincode}</p>
						<p>Phone#: {order.shippingInfo.phonenumber}</p>
					</div>
					<div className="UserDetails">
						<h1>User Details</h1>
						<p>Name: {order.user.name}</p>
						<p>Email: {order.user.email}</p>
					</div>
					<div className="OrderItems">
						<h1>Order Items</h1>
						<div className="cartItems">
							{order.orderItems &&
								order.orderItems.map((item) => (
									<div className="cartItem">
										<p>Name:{item.name}</p>
										<p>Price:{item.price}</p>
										<p>Quantity {item.qty}</p>
									</div>
								))}
						</div>
					</div>
					<div className="orderStatus">
						<h1>Order Status</h1>
						<em
							className={order.orderStatus === "processing" ? "red" : "green"}
						>
							{order.orderStatus}
						</em>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default OrderDetails;
