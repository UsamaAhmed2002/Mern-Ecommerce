import axios from "axios";
import {
	ALL_PRODUCTSDETAILS_REQUEST,
	ALL_PRODUCTSDETAILS_SUCCESS,
	ALL_PRODUCTSDETAILS_FAIL,
	CLEAR_ERRORS,
	ADD_REVIEW_REQUEST,
	ADD_REVIEW_SUCCESS,
	ADD_REVIEW_FAIL,
} from "../constants/productConstants";
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: ALL_PRODUCTSDETAILS_REQUEST,
		});
		const { data } = await axios(`/api/v1/products/${id}`);
		dispatch({
			type: ALL_PRODUCTSDETAILS_SUCCESS,
			payload: data.product,
		});
	} catch (error) {
		dispatch({
			type: ALL_PRODUCTSDETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
export const AddReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: ADD_REVIEW_REQUEST });

		const { data } = await axios.patch("/api/v1/products/review", reviewData);

		dispatch({ type: ADD_REVIEW_SUCCESS, payload: data.success });
	} catch (e) {
		dispatch({
			type: ADD_REVIEW_FAIL,
			payload: e.response.data.message,
		});
	}
};
