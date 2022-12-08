import {
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_FAIL,
	ADMIN_PRODUCTS_SUCCESS,
} from "../constants/productConstants";

export const GetALlAdminProductsReducer = (
	state = { products: [] },
	action
) => {
	switch (action.type) {
		case ADMIN_PRODUCTS_REQUEST:
			return {
				isLoading: true,
			};
		case ADMIN_PRODUCTS_SUCCESS:
			return {
				isLoading: false,
				products: action.payload,
			};
		case ADMIN_PRODUCTS_FAIL:
			return {
				isLoading: false,
				error: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
