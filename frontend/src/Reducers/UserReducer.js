import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_ERRORS,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOAD_USER_FAIL,
	LOAD_USER_SUCCESS,
	LOAD_USER_REQUEST,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_RESET,
	UPDATE_PROFILE_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_RESET,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_RESET,
	RESET_PASSWORD_FAIL,
	FORGOT_PASSWORD_RESET,
} from "../constants/UserConstants";
export const UserReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
		case LOAD_USER_REQUEST:
		case LOGOUT_USER_REQUEST:
			return {
				laoding: true,
				isAuthenticated: false,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case LOGOUT_USER_SUCCESS:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
			};
		case REGISTER_FAIL:
		case LOAD_USER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				loading: false,
				...state,
				error: null,
			};
		default:
			return state;
	}
};
export const UpdateUserReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
		case UPDATE_PROFILE_REQUEST:
		case UPDATE_PASSWORD_REQUEST:
			return {
				laoding: true,
			};
		case UPDATE_PROFILE_SUCCESS:
		case UPDATE_PASSWORD_SUCCESS:
		case RESET_PASSWORD_SUCCESS:
			return {
				loading: false,
				isUpdated: true,
			};
		case UPDATE_PROFILE_RESET:
		case UPDATE_PASSWORD_RESET:
		case RESET_PASSWORD_RESET:
			return {
				loading: false,
				isUpdated: false,
			};
		case UPDATE_PROFILE_FAIL:
		case UPDATE_PASSWORD_FAIL:
		case RESET_PASSWORD_FAIL:
			return {
				loading: false,
				isUpdated: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};
export const ForgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return {
				laoding: true,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				loading: false,
				message: action.payload,
			};
		case FORGOT_PASSWORD_RESET:
			return {
				loading: false,
				message: undefined,
			};
		case FORGOT_PASSWORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};
