import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productDetailsReducer } from "./Reducers/productDetailsReducer";
import { productReducer } from "./Reducers/productreducer";
import CartReducer from "./Reducers/CartReducer";
import { ProductsApi } from "./ProductsApi/ProductsApi.js";
import {
	ForgotPasswordReducer,
	UpdateUserReducer,
	UserReducer,
} from "./Reducers/UserReducer";
import OrderReducer from "./Reducers/OrderReducer";
import MyOrdersReducer from "./Reducers/MyOrdersReducer";
import GetSingleOrderReducer from "./Reducers/GetSingleOrderReducer";
import AddReviewReducer from "./Reducers/AddReviewReducer";
import { GetALlAdminProductsReducer } from "./Reducers/AdminProductsReducer";
import DeleteProductReducer from "./Reducers/DeleteProductReducer";
import CreateProduct from "./Reducers/AdminCreateProduct";
import UpdateProduct from "./Reducers/AdminUpdateProduct";
export const store = configureStore({
	reducer: {
		product: productReducer,
		productDetails: productDetailsReducer,
		user: UserReducer,
		updateUser: UpdateUserReducer,
		forgotPassword: ForgotPasswordReducer,
		cart: CartReducer.reducer,
		order: OrderReducer,
		MyOrders: MyOrdersReducer,
		OrderDetails: GetSingleOrderReducer,
		addReview: AddReviewReducer,
		AdminProducts: GetALlAdminProductsReducer,
		DeleteProduct: DeleteProductReducer,
		createProduct: CreateProduct,
		UpdateProduct: UpdateProduct,
		[ProductsApi.reducerPath]: ProductsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(ProductsApi.middleware),
});
