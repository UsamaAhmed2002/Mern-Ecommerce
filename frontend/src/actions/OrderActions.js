import axios from "axios";
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	MY_ORDER_FAIL,
	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
	GET_SINGLE_ORDER_REQUEST,
	GET_SINGLE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_FAIL,
} from "../constants/OrderConstants";

export const CreateOrder = (order) => async (dispatch) => {
	console.log(order);
	try {
		dispatch({
			type: CREATE_ORDER_REQUEST,
		});

		const { data } = await axios.post("/api/v1/orders", order);

		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data.order,
		});
	} catch (e) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: e.response.data.message,
		});
	}
};

export const MyOrders = () => async (dispatch) => {
	try {
		dispatch({ type: MY_ORDER_REQUEST });
		const { data } = await axios.get("/api/v1/myorders");

		dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
	} catch (e) {
		dispatch({ type: MY_ORDER_FAIL, payload: e.response.data.message });
	}
};

export const GetOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_SINGLE_ORDER_REQUEST });

		const { data } = await axios.get(`/api/v1/orders/${id}`);
		dispatch({ type: GET_SINGLE_ORDER_SUCCESS, payload: data.order });
	} catch (e) {
		dispatch({
			type: GET_SINGLE_ORDER_FAIL,
			payload: e.response.data.message,
		});
	}
};
