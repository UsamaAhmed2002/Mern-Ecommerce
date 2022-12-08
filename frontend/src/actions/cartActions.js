import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART } from "../constants/CartConstants";
export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/v1/products/${id}`);
	dispatch({
		type: ADD_TO_CART,
		payload: {
			product: data.productDetails,
			qty,
		},
	});
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const itemExist = cart.find((i) => i._id === data.productDetails._id);
	if (itemExist) {
		return;
	} else {
		cart.push(data.productDetails);
		localStorage.setItem("cart", JSON.stringify(cart));
	}
};
