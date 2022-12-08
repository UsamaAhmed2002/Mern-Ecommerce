import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_ERRORS,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOAD_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_RESET,
	UPDATE_PROFILE_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
} from "../constants/UserConstants";
import axios from "axios";
import { config } from "dotenv";
export const login = (user) => async (dispatch) => {
	try {
		const { email, password } = user;
		dispatch({
			type: LOGIN_REQUEST,
		});

		const { data } = await axios.post(
			`http://localhost:4000/api/v1/user/login`,
			{
				email,
				password,
			}
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message,
		});
	}
};
export const register = (user) => async (dispatch) => {
	try {
		const { name, email, password } = user;
		dispatch({
			type: REGISTER_REQUEST,
		});

		const { data } = await axios.post(
			`http://localhost:4000/api/v1/user/register`,
			{
				name,
				email,
				password,
			}
		);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//update Profile
export const updateProfile = (name, email) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATE_PROFILE_REQUEST,
		});

		const { data } = await axios.patch(
			`http://localhost:4000/api/v1/user/me/update`,
			{
				name,
				email,
			}
		);
		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};
//update Password
export const updatePassword = (passwords) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATE_PASSWORD_REQUEST,
		});
		const { data } = await axios.patch(
			`http://localhost:4000/api/v1/user/updatepassword`,
			passwords
		);
		dispatch({
			type: UPDATE_PASSWORD_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};
//reset Password
export const resetPassword =
	(token, password, confirmPassword) => async (dispatch) => {
		try {
			dispatch({
				type: RESET_PASSWORD_REQUEST,
			});
			const { data } = await axios.patch(
				`http://localhost:4000/api/v1/user/password/reset/${token}`,
				{ password, confirmPassword }
			);
			dispatch({
				type: RESET_PASSWORD_SUCCESS,
				payload: data.success,
			});
		} catch (error) {
			dispatch({
				type: RESET_PASSWORD_FAIL,
				payload: error.response.data.message,
			});
		}
	};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		});
		const { data } = await axios.post(
			`http://localhost:4000/api/v1/user/password/forgot`,
			{
				email,
			}
		);
		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};
export const getUserDetails = () => async (dispatch) => {
	try {
		dispatch({
			type: LOAD_USER_REQUEST,
		});

		const { data } = await axios.get(`http://localhost:4000/api/v1/user/me`);
		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};
export const logout = () => async (dispatch) => {
	try {
		dispatch({ type: LOGOUT_USER_REQUEST });
		await axios.get("http://localhost:4000/api/v1/user/logout");
		dispatch({
			type: LOGOUT_USER_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
