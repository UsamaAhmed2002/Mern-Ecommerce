import {
	GET_SINGLE_ORDER_FAIL,
	GET_SINGLE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_REQUEST,
} from "../constants/OrderConstants";

const GetSingleOrderReducer = (state = { order: {} }, action) => {
	switch (action.type) {
		case GET_SINGLE_ORDER_REQUEST:
			return {
				isLoading: true,
			};
		case GET_SINGLE_ORDER_SUCCESS:
			return {
				isLoading: false,
				order: action.payload,
			};
		case GET_SINGLE_ORDER_FAIL:
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
export default GetSingleOrderReducer;
