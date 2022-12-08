import React, { Fragment, useEffect } from "react";
import Product from "./productsCard/ProductCard";
import "./Home.css";
import MetaData from "./../layouts/MetaData";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useProductsQuery } from "../../ProductsApi/ProductsApi.js";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "./productsCard/ProductCard";
const Home = () => {
	//fetching data using RTKQUery Tool
	const { data, isSuccess, isLoading, isFetching, error } = useProductsQuery();

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);
	return (
		<Fragment>
			<MetaData title="Shopicom" />
			<div className="mainContainerHome">
				<div className="banner">
					<h1>Welcome to Shopicom</h1>
					<p>Single Solutions For All of Your Problems</p>
					<a href="#productContainer">Scroll</a>
				</div>
				<div className="featured">
					<h1>Featured Products</h1>
				</div>
				{isLoading && isFetching ? (
					<Loader />
				) : (
					isSuccess && (
						<Container>
							<Row>
								{data.products &&
									data.products.map((prod) => (
										<ProductCard key={prod._id} product={prod} />
									))}
							</Row>
						</Container>
					)
				)}
			</div>
		</Fragment>
	);
};

export default Home;
