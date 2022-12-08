import {
	ADMIN_CREATE_PRODUCT_REQUEST,
	ADMIN_CREATE_PRODUCT_FAIL,
	ADMIN_CREATE_PRODUCT_SUCCESS,
	ADMIN_CREATE_PRODUCT_RESET,
} from "../constants/productConstants";
const CreateProduct = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_CREATE_PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_CREATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case ADMIN_CREATE_PRODUCT_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		case ADMIN_CREATE_PRODUCT_RESET:
			return {
				loading: false,
				success: false,
				error: false,
			};
		default:
			return { ...state };
	}
};
export default CreateProduct;
