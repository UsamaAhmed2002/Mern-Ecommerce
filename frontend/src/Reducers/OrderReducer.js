import React from "react";
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
} from "../constants/OrderConstants";
const OrderReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				isLoading: true,
				...state,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				isLoading: false,
				order: action.payload,
			};
		case CREATE_ORDER_FAIL:
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

export default OrderReducer;
