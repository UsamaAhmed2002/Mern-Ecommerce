import React, { Fragment, useRef } from "react";
import { BsCreditCard } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Checkout/CheckoutSteps/CheckoutSteps";
import MetaData from "../layouts/MetaData";
import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import {
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CreateOrder } from "../../actions/OrderActions";
const Payment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems, shippingInfo } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const payBtn = useRef();
	const stripe = useStripe();
	const elements = useElements();
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
	const order = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.subTotal,
		taxPrice: orderInfo.Gst,
		shippingPrice: orderInfo.shippingCharges,
		totalPrice: orderInfo.grandTotal,
	};
	console.log(order.shippingInfo);
	//function for form submission and sending payment
	const handleSubmit = async (event) => {
		event.preventDefault();
		payBtn.current.disabled = true;
		try {
			const paymentData = {
				amount: Math.round(orderInfo.grandTotal * 100),
			};

			//sending payment amount to the server
			const { data } = await axios.post("/api/v1/processpayment", paymentData);

			//pulling out clientSecret key from the response sent by server
			const clientSecret = data.client_secret;
			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: shippingInfo.address,
							state: shippingInfo.state,
							postal_code: shippingInfo.pinCode,
							country: shippingInfo.country,
						},
					},
				},
			});
			if (result.error) {
				payBtn.current.disabled = false;
				toast.error(result.error.message);
			} else if (result.paymentIntent.status === "succeeded") {
				order.paymentInfo = {
					id: result.paymentIntent.id,
					status: result.paymentIntent.status,
				};
				dispatch(CreateOrder(order));
				navigate("/success");
				toast.success("Payment was Successfull");
			} else {
				toast.error("There was some issue while processing payment");
			}
		} catch (e) {
			payBtn.current.disabled = false;
			toast.error(e);
			console.log(e);
		}
	};
	return (
		<Fragment>
			<MetaData title={"Payment"} />
			<CheckoutSteps activeSteps={2} />
			<div className=" container">
				<form onSubmit={handleSubmit}>
					<h1>Card Info</h1>
					<p>Enter Your Card Number</p>
					<div className="inputContainer">
						<BsCreditCard />
						<CardNumberElement className="inputField" />
					</div>
					<p>Enter Your Card Expiry Number</p>
					<div className="inputContainer">
						<BsCreditCard />
						<CardExpiryElement className="inputField" />
					</div>
					<p>Enter Your Card Cvc Number</p>
					<div className="inputContainer">
						<BsCreditCard />
						<CardCvcElement className="inputField" />
					</div>
					<button type="submit" disabled={!stripe || !elements} ref={payBtn}>
						Pay
					</button>
				</form>
			</div>
		</Fragment>
	);
};

const StripePayment = () => {
	const stripeApi = loadStripe(
		"pk_test_51M26V8Kvl82zcucyt6zRLqpihgGoE06ePZxjv5NYIkiYNMth0dLOCjqtqnoUbaHLKseVXqc7z2iOl941I8iXfgTL00R4lsrQ8D"
	);
	return (
		<Elements stripe={stripeApi}>
			<Payment />
		</Elements>
	);
};
export default StripePayment;
