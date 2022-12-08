import {
	ALL_PRODUCTSDETAILS_REQUEST,
	ALL_PRODUCTSDETAILS_SUCCESS,
	ALL_PRODUCTSDETAILS_FAIL,
} from "../constants/productConstants";
export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case ALL_PRODUCTSDETAILS_REQUEST:
			return {
				loading: true,
				product: {},
			};
		case ALL_PRODUCTSDETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case ALL_PRODUCTSDETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return { ...state };
	}
};
