import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import CheckoutSteps from "../Checkout/CheckoutSteps/CheckoutSteps";
import MetaData from "../layouts/MetaData";
import "./ConfirmOrder.css";
import { useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
	const navigate = useNavigate();
	const { cartItems, shippingInfo } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const subTotal = cartItems.reduce(
		(acc, item) => acc + item.qty * item.price,
		0
	);
	const shippingCharges = subTotal > 1000 ? 0 : 200;
	const Gst = subTotal * 0.1;
	const grandTotal = subTotal + shippingCharges + Gst;

	const handleProcessPayment = (e) => {
		e.preventDefault();
		const data = {
			grandTotal,
			Gst,
			shippingCharges,
			subTotal,
		};
		navigate("/payment");
		sessionStorage.setItem("orderInfo", JSON.stringify(data));
	};
	useEffect(() => {
		if (cartItems) {
			const calShippingCharges = () => {};
			calShippingCharges();
		}
	}, [cartItems]);
	return (
		<Fragment>
			<MetaData title={"Confirm Order"} />
			<CheckoutSteps activeSteps={1} />
			<Container className="mt-5">
				<Row>
					<Col md="8" className="leftSide">
						<Col className="userDetails">
							<h1>User Details</h1>
							<p>
								<span>Name: </span> {user.name}
							</p>
							<p>
								<span>Email: </span> {user.email}
							</p>
							<p>
								<span>Phone: </span> {shippingInfo.phone}
							</p>
							<p>
								<span>Address: </span> {shippingInfo.address}
							</p>
						</Col>
						<Col className="pDetails">
							<h1>Your Cart Items</h1>
							{cartItems &&
								cartItems.map((item, i) => (
									<Row key={i} className="prod">
										<Col xs="6">
											<img src={item.img.url} alt="" className="img-fluid" />
										</Col>
										<Col xs="3">
											<span>Name</span>
											<p>{item.name}</p>
										</Col>
										<Col xs="3">
											<span>Price</span>
											<p>
												${item.qty}x{item.price}={item.qty * item.price}
											</p>
										</Col>
									</Row>
								))}
						</Col>
					</Col>
					<Col md="4" className="OrderSummary mt-5">
						<h1>Order Summary</h1>
						<div>
							<p>Subtotal</p>
							<span>${subTotal}</span>
						</div>
						<div>
							<p>Shipping Charges</p>
							<span>${shippingCharges}</span>
						</div>
						<div>
							<p>Gst</p>
							<span>${Gst}</span>
						</div>
						<div>
							<p>Total</p>
							<span>$ {grandTotal}</span>
						</div>
						<div>
							<button onClick={handleProcessPayment}>Proceed to Payment</button>
						</div>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default ConfirmOrder;
