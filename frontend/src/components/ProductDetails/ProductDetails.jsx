import React, { Fragment, useEffect, useState } from "react";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./../layouts/MetaData";
import { AddReview, clearErrors } from "../../actions/productDetailsActions";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewCard from "./ProductReviewCard/ReviewCard";
import Carousel from "react-material-ui-carousel";
import Loader from "./../Loader/Loader";
import { ADD_TO_CART } from "../../Reducers/CartReducer";
import { useProductQuery } from "./../../ProductsApi/ProductsApi.js";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Rating,
} from "@mui/material";
import { ADD_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
	const { isAuthenticated } = useSelector((state) => state.user);

	//getting state when Review is Added
	const {
		success,
		isLoading: addReviewIsLoading,
		error: addReviewError,
	} = useSelector((state) => state.addReview);

	//first getting id of Product From the url params
	const { id } = useParams();

	//fetching data from the Server Using Hook Generated by RTK Query
	const { data, isSuccess, isFetching, error, isLoading } = useProductQuery(id);
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();

	//quantity increment and decrement handlers
	const handleQtyInc = () => {
		if (isSuccess) if (data.product.stock <= qty) return;
		setQty(qty + 1);
	};
	const handlyQtyDec = () => {
		if (1 >= qty) return;
		setQty(qty - 1);
	};

	//payload dataa for Add To Cart Action
	if (isSuccess) {
		var payload = {
			_id: data.product._id,
			name: data.product.name,
			img: data.product.images,
			qty,
			price: data.product.price,
		};
	}

	//function when a user Clicks Add To Cart
	const handleAddToCart = (e) => {
		e.preventDefault();
		if (isAuthenticated) {
			dispatch(ADD_TO_CART(payload));
		} else {
			toast.error("Please Log In First!");
		}
	};

	//submit review function
	const reviewSubmitHandler = () => {
		const productid = data.product._id;
		const reviewData = { rating, comment, productid };
		dispatch(AddReview(reviewData));
		setOpen(false);
	};

	//Review Dialouge Toggle
	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};

	//this code will run whenever page reloads or the items in dependency array changes
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		} else if (addReviewError) {
			toast.error(addReviewError);
			dispatch(clearErrors());
		}

		//this runs if review is added successfully
		if (success) {
			toast.success("Review Added Successfully");
			dispatch({ type: ADD_REVIEW_RESET });
		}
	}, [dispatch, error, success, addReviewError]);

	return (
		<Fragment>
			{isLoading && isFetching && addReviewIsLoading ? (
				<Loader />
			) : (
				isSuccess && (
					<Fragment>
						<MetaData title={`${data.product.name}-Details`} />

						<div className="d-md-flex justify-content-evenly my-5 productDetails">
							<div className=" container col-md-4">
								<Carousel>
									{data.product.images &&
										data.product.images.map((item, i) => (
											<img
												src={item.url}
												key={i}
												alt=""
												className="img-fluid carouselImg"
											/>
										))}
								</Carousel>
							</div>
							<div className="col-md-8">
								<div className="d-sm-flex  flex-column justify-content-center align-items-center rightDetails">
									<h2>{data.product.name}</h2>
									<p className="text-secondary">Product # {data.product._id}</p>
									<div className="d-flex align-items-center">
										<Rating
											readOnly
											value={data.product.ratings}
											precision={0.5}
										/>
										{data.product.reviews && data.product.reviews[0] ? (
											<span>({data.product.reviews.length}Reviews)</span>
										) : (
											<span>({0}Reviews)</span>
										)}
									</div>
									<div className="d-flex my-3 align-items-center">
										<h2>Status</h2>
										<p
											className={`${data.product.stock > 0 ? "green" : "red"}`}
										>
											InStock
										</p>
									</div>
									<div className="my-3">
										<h1>Rs/{data.product.price}</h1>
									</div>
									<div className="d-flex qtyBox my-3">
										<button
											className="bg-dark text-white "
											onClick={handlyQtyDec}
										>
											-
										</button>
										<input type="number" value={qty} readOnly />
										<button
											className="bg-dark text-white"
											onClick={handleQtyInc}
										>
											+
										</button>
									</div>
									<div className="productDescription my-5">
										<h2>Description</h2>
										<p>{data.product.productDescription}</p>
									</div>

									<div className="actionButtons">
										<button className="review" onClick={() => setOpen(true)}>
											Leave a Review
										</button>
										<button className="addToCart" onClick={handleAddToCart}>
											Add To Cart
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* submit Review Modal*/}
						<Dialog
							aria-labelledby="simple-dialog-title"
							open={open}
							onClose={submitReviewToggle}
						>
							<DialogTitle className="dialougeTitle">Submit Review</DialogTitle>
							<DialogContent className="submitDialog">
								<Rating
									name="read-only"
									onChange={(e, newValue) => setRating(newValue)}
									size="large"
								/>

								<textarea
									className="submitDialogTextArea"
									cols="30"
									rows="5"
									onChange={(e) => setComment(e.target.value)}
								></textarea>
							</DialogContent>
							<DialogActions>
								<Button onClick={submitReviewToggle} color="secondary">
									Cancel
								</Button>
								<Button onClick={reviewSubmitHandler} color="primary">
									Submit
								</Button>
							</DialogActions>
						</Dialog>

						<h3 className="reviewHeading">Reviews </h3>
						{data.product.reviews && data.product.reviews[0] ? (
							data.product.reviews.map((review, i) => (
								<ReviewCard key={i} review={review} />
							))
						) : (
							<h1 className="text-center text-secondary m-5 noReview">
								No Reviews Yet
							</h1>
						)}
					</Fragment>
				)
			)}
		</Fragment>
	);
};

export default ProductDetails;
