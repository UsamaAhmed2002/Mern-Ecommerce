import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../actions/productActions";
import ProductCard from "../Home/productsCard/ProductCard";
import NotFound from "../NotFound";
import "./searchedp.css";
const SearchedProduct = () => {
	const { keyword } = useParams();
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.product);
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(getAllProducts(keyword));
	}, [dispatch]);
	return (
		<Fragment>
			{loading ? (
				"loading"
			) : products.length > 0 ? (
				<div className="container my-5 " id="productContainer">
					<div className="row  ">
						{products &&
							products.map((prod) => (
								<ProductCard key={prod._id} product={prod} />
							))}
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</Fragment>
	);
};

export default SearchedProduct;
