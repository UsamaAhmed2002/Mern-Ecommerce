import {
	MY_ORDER_FAIL,
	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
} from "../constants/OrderConstants";
const MyOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case MY_ORDER_REQUEST:
			return {
				isLoading: true,
			};

		case MY_ORDER_SUCCESS:
			return {
				isLoading: false,
				orders: action.payload,
			};
		case MY_ORDER_FAIL:
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
export default MyOrdersReducer;
