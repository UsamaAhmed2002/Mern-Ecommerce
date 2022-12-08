import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./product.css";

const ProductCard = (props) => {
	const { product } = props;

	const options = {
		edit: false,
		color: "rgba(20,20,20,0.1)",
		activeColor: "tomato",
		size: window.innerWidth < 600 ? 20 : 25,
		value: product.ratings,
		isHalf: 5,
	};
	return (
		<Fragment>
			<div className="col-md-4  ">
				<div className="col-12 mb-5 text-center product">
					<Link to={`/products/${product._id}`} className="text-dark">
						<div className="card">
							<div className="image">
								<img
									// src={product.images[0].url}
									src={product.images[0].url}
									className="card-img-top"
									alt="productImage"
								/>
							</div>
							<div className="card-body ">
								<h5 className="card-title">{product.name}</h5>
								<p>Rs/{product.price}</p>
								<ReactStars {...options} />
								<span className="m-5">{product.reviews.length}Review(s)</span>
								<button type="button" className="btn btn-primary cart-btn ">
									More Details
								</button>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductCard;
