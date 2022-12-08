import {
	ADMIN_DELETE_PRODUCTS_REQUEST,
	ADMIN_DELETE_PRODUCTS_FAIL,
	ADMIN_DELETE_PRODUCTS_SUCCESS,
	CLEAR_SUCCESS,
} from "../constants/productConstants";

const DeleteProductReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_PRODUCTS_REQUEST:
			return {
				isLoading: true,
			};
		case ADMIN_DELETE_PRODUCTS_SUCCESS:
			return {
				isLoading: false,
				success: action.payload,
			};
		case ADMIN_DELETE_PRODUCTS_FAIL:
			return {
				isLoading: false,
				error: action.payload,
			};
		case CLEAR_SUCCESS:
			return {
				isLoading: false,
				success: null,
			};
		default:
			return { ...state };
	}
};
export default DeleteProductReducer;
