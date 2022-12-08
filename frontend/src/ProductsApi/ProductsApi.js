import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductsApi = createApi({
	reducerPath: "ProductsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
	endpoints: (builder) => ({
		Products: builder.query({
			query: () => `/products`,
		}),
		Product: builder.query({
			query: (id) => `/products/${id}`,
		}),
	}),
});
export const { useProductsQuery, useProductQuery } = ProductsApi;
