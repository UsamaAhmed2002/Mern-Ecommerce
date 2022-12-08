import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
var iniState = {
	cartItems: JSON.parse(localStorage.getItem("cart")) || [],
	shippingInfo: {},
};

const CartReducer = createSlice({
	name: "cart",
	initialState: iniState,
	reducers: {
		ADD_TO_CART(state, action) {
			const item = action.payload;
			//setting cart item into local Storage
			let cart = JSON.parse(localStorage.getItem("cart")) || [];
			const itemExists = cart.find((i) => i._id === item._id);
			if (itemExists) {
				return {
					...state,
					cartItems: state.cartItems.map((i) =>
						i._id === item._id ? item : i
					),
				};
			} else {
				cart.push(item);
				localStorage.setItem("cart", JSON.stringify(cart));
			}
			//finished setting Local Storage
			//now mutating the state

			const itemExist = state.cartItems.find((i) => i._id === item._id);
			if (itemExist) {
				return {
					...state,
					cartItems: [
						state.cartItems.map((i) => (i._id === item._id ? item : i)),
					],
				};
			} else {
				toast.success("Item Added To Cart Successfully!");
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		},
		RemoveFromCart(state, action) {
			const id = action.payload;
			const cart = state.cartItems.filter((item) => item._id !== id);
			localStorage.setItem("cart", JSON.stringify(cart));
			toast.success("Item removed Successfully");
			return {
				...state,
				cartItems: state.cartItems.filter((i) => i._id !== id),
			};
		},
		SaveShippingInfo(state, action) {
			const data = action.payload;

			sessionStorage.setItem("shippingInfo", JSON.stringify(data));
			return {
				...state,
				shippingInfo: data,
			};
		},
	},
});

export const { ADD_TO_CART, RemoveFromCart, SaveShippingInfo } =
	CartReducer.actions;
export default CartReducer;
// const CartReducer = (state = { cartItems: [] }, action) => {
// 	switch (action.type) {
// 		case ADD_TO_CART:
// 			const item = action.payload.product;
// 			if (state.cartItems[0]) {
// 				const itemExists = state.cartItems.find((i) => i._id === item._id);
// 				if (itemExists)
// 					return {
// 						...state,
// 						message: "Item Already Exists in your Cart!",
// 					};
// 			} else {
// 				return {
// 					...state,
// 					cartItems: [...state.cartItems, { ...item }],
// 					message: "Item Added to Cart Successfully",
// 				};
// 			}
// 		case ADD_TO_CART_RESET:
// 			return {
// 				...state,
// 				message: undefined,
// 			};
// 		default:
// 			return { ...state };
// 	}
// };
// export default CartReducer;
