import { defaultEqualityCheck } from "reselect";
import {
	ADD_REVIEW_FAIL,
	ADD_REVIEW_REQUEST,
	ADD_REVIEW_SUCCESS,
	ADD_REVIEW_RESET,
} from "../constants/productConstants";

const AddReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_REVIEW_REQUEST:
			return {
				isLoading: true,
			};
		case ADD_REVIEW_SUCCESS:
			return {
				isLoading: false,
				...state,
				success: action.payload,
			};
		case ADD_REVIEW_FAIL:
			return {
				isLoading: false,
				error: action.payload,
			};
		case ADD_REVIEW_RESET:
			return {
				isLoading: false,
				success: false,
			};
		default:
			return {
				...state,
			};
	}
};
export default AddReviewReducer;
