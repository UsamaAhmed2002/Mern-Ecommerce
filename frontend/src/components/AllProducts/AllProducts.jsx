import { CardActions, Slide, Slider, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardImg,
	CardSubtitle,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
} from "reactstrap";
import { clearErrors, getAllProducts } from "../../actions/productActions";
import ProductCard from "../Home/productsCard/ProductCard";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import "./AllProducts.css";
import Loader from "../Loader/Loader";
const catagories = [
	"laptop",
	"mobile",
	"footwear",
	"undergarments",
	"watches",
	"machines",
];
const AllProducts = () => {
	const { keyword } = useParams();
	const [page, setPage] = useState(1);
	const [catagory, setCategory] = useState("");
	const [rating, setRating] = useState([0, 5]);
	const { loading, error, products } = useSelector((state) => state.product);
	const [price, setPrice] = useState([0, 25000]);
	const changePrice = (e, val) => {
		setPrice(val);
	};
	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(getAllProducts(keyword, page, price, catagory, rating));
	}, [dispatch, keyword, page, price, catagory, rating, error]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<Container>
						<Row>
							<Col md={2} xs={8} className="mx-5 my-5">
								<p>
									Price
									<Slider
										value={price}
										min={0}
										max={25000}
										valueLabelDisplay="auto"
										onChange={changePrice}
									/>
								</p>
								<Card className="catagory-box">
									<CardTitle className="text-center my-2 ">
										Catagories
									</CardTitle>
									<CardBody>
										<ul>
											{catagories &&
												catagories.map((category) => (
													<li
														key={category}
														onClick={() => setCategory(category)}
													>
														{category}
													</li>
												))}
										</ul>
									</CardBody>
								</Card>
								<fieldset className="my-5">
									<Typography component="legend">Ratings </Typography>
									<Slider
										value={rating}
										onChange={(e, newrating) => {
											setRating(newrating);
										}}
										valueLabelDisplay="auto"
										aria-labelledby="continuous-slider"
										min={0}
										max={5}
									/>
								</fieldset>
							</Col>
							<Col className="my-5 ">
								<Row>
									{products && products[0] ? (
										products.map((product, i) => (
											<ProductCard product={product} key={i} />
										))
									) : (
										<h1>No products To Show</h1>
									)}
								</Row>
							</Col>
						</Row>
					</Container>
				</Fragment>
			)}
			<div className=" paginationBox">
				<Pagination
					variant="outlined"
					count={10}
					defaultPage={1}
					onChange={(e, page) => setPage(page)}
				/>
			</div>
		</Fragment>
	);
};

export default AllProducts;
