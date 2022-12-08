import axios from "axios";
import {
	ADMIN_CREATE_PRODUCT_FAIL,
	ADMIN_CREATE_PRODUCT_REQUEST,
	ADMIN_CREATE_PRODUCT_SUCCESS,
	ADMIN_DELETE_PRODUCTS_REQUEST,
	ADMIN_DELETE_PRODUCTS_SUCCESS,
	ADMIN_PRODUCTS_FAIL,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_SUCCESS,
	ADMIN_EDIT_PRODUCT_FAIL,
	ADMIN_EDIT_PRODUCT_REQUEST,
	ADMIN_EDIT_PRODUCT_SUCCESS,
	ADMIN_UPDATE_PRODUCT_FAIL,
	ADMIN_UPDATE_PRODUCT_REQUEST,
	ADMIN_UPDATE_PRODUCT_SUCCESS,
	ADMIN_UPDATE_PRODUCT_RESET,
	ALL_PRODUCTS_FAIL,
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	CLEAR_ERRORS,
	CLEAR_SUCCESS,
} from "../constants/productConstants";
export const getAllProducts =
	(
		//initial values when a user dont apply any filter or search
		keyword = "",
		page = "1",
		price = [0, 10000000],
		catagory = "",
		rating = [0, 5]
	) =>
	async (dispatch) => {
		try {
			dispatch({
				type: ALL_PRODUCTS_REQUEST,
			});
			let link = `http://localhost:4000/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}`;
			if (catagory) {
				link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&catagory=${catagory}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}`;
			}
			if (keyword) {
				link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}`;
			}
			if (catagory && keyword) {
				link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&catagory=${catagory}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}`;
			}

			const { data } = await axios.get(link);
			dispatch({
				type: ALL_PRODUCTS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ALL_PRODUCTS_FAIL,
				payload: error.response.data.message,
			});
		}
	};

//function for Admin Gettig=ng all Admin Products

export const GetAdminProducts = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_PRODUCTS_REQUEST });

		const { data } = await axios.get("/api/v1/admin/products");

		dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products });
	} catch (e) {
		dispatch({ type: ADMIN_PRODUCTS_FAIL, payload: e.response.data.message });
	}
};

//function for deleting a product by admin
export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_PRODUCTS_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/products/${id}`);

		dispatch({ type: ADMIN_DELETE_PRODUCTS_SUCCESS, payload: data.success });
	} catch (e) {
		dispatch({
			type: ADMIN_PRODUCTS_FAIL,
			payload: e.response.data.message,
		});
	}
};
//function for deleting a product by admin
export const createProduct = (formData) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST });

		const { data } = await axios.post(`/api/v1/admin/products`, formData);

		dispatch({ type: ADMIN_CREATE_PRODUCT_SUCCESS, payload: data.success });
	} catch (e) {
		dispatch({
			type: ADMIN_CREATE_PRODUCT_FAIL,
			payload: e.response.data.message,
		});
	}
};

//function for updating product
export const updateProduct = (id, formData) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });

		const { data } = await axios.patch(
			`/api/v1/admin/products/${id}`,
			formData
		);
		dispatch({ type: ADMIN_UPDATE_PRODUCT_SUCCESS, payload: data.status });
	} catch (e) {
		dispatch({
			type: ADMIN_UPDATE_PRODUCT_FAIL,
			payload: e.response.data.message,
		});
	}
};

// function for clearing all errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
// function for clearing all success
export const clearSuccess = () => async (dispatch) => {
	dispatch({ type: CLEAR_SUCCESS });
};
