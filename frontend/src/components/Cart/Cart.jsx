import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { RemoveFromCart } from "../../Reducers/CartReducer";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link, useNavigate } from "react-router-dom";

import "./Cart.css";
import { toast } from "react-toastify";
import { Country } from "country-state-city";
const Cart = () => {
	const navigate = useNavigate();
	const { message } = useSelector((state) => state.cart);
	const disptach = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);
	const handleCheckOut = () => {};
	useEffect(() => {
		if (message) {
			toast.error(message);
		}
	}, [message]);
	return (
		<Fragment>
			{cartItems.length <= 0 ? (
				<div className="mainDiv">
					<div className="centerDiv">
						<ShoppingCartCheckoutIcon />
						<p>Your Cart is Empty</p>
						<Link to={"/products"}>Checkout Our Products</Link>
					</div>
				</div>
			) : (
				<Container fluid="md">
					<Row className="header bg-success mt-5">
						<Col xs="4" className="mt-3">
							<p>Product</p>
						</Col>
						<Col xs="4 mt-3">
							<p>Quantity</p>
						</Col>
						<Col xs="4 mt-3">
							<p>SubTotal</p>
						</Col>
					</Row>
					{cartItems.map((item) => (
						<Row className=" bg-light py-4 mt-5  " key={item._id}>
							<Col xs="4" className="prodDescription">
								<Row>
									<Col sm="6">
										<img
											src={item.img.url && item.img.url}
											alt=""
											className="img-fluid mt-2"
										/>
									</Col>
									<Col>
										<p>{item.name}</p>
										<p>{item.price}</p>
										<p>
											<button
												className="removebtn"
												onClick={() => {
													disptach(RemoveFromCart(item._id));
												}}
											>
												Remove
											</button>
										</p>
									</Col>
								</Row>
							</Col>
							<Col xs="4">
								<p>{item.qty}</p>
							</Col>
							<Col xs="4">
								<p>{item.price * item.qty}</p>
							</Col>
						</Row>
					))}
					<div className="subTotal">
						<div className="total">
							<p>Gross Total</p>

							<p>{`$${cartItems.reduce(
								(acc, item) => acc + item.price * item.qty,
								0
							)}`}</p>
						</div>
						<div className="button">
							<button
								onClick={(e) => {
									e.preventDefault();
									navigate("/checkout");
								}}
							>
								CheckOut
							</button>
						</div>
					</div>
				</Container>
			)}
		</Fragment>
	);
};

export default Cart;
