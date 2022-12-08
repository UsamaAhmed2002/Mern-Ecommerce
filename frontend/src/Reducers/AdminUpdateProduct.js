import { ActionTypes } from "@mui/base";
import {
	ADMIN_UPDATE_PRODUCT_FAIL,
	ADMIN_UPDATE_PRODUCT_RESET,
	ADMIN_UPDATE_PRODUCT_SUCCESS,
	ADMIN_UPDATE_PRODUCT_REQUEST,
} from "../constants/productConstants";

const UpdateProduct = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_UPDATE_PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_UPDATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				status: action.payload,
			};
		case ADMIN_UPDATE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ADMIN_UPDATE_PRODUCT_RESET:
			return {
				loading: false,
				error: null,
				status: null,
			};
		default:
			return {
				...state,
			};
	}
};
export default UpdateProduct;
