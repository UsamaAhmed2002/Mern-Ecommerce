import React from "react";
import ReactStars from "react-rating-stars-component";
import "./ReviewCard.css";
const ReviewCard = ({ review }) => {
	const options = {
		edit: false,
		color: "rgba(20,20,20,0.1)",
		activeColor: "tomato",
		size: window.innerWidth < 600 ? 20 : 25,
		value: review.rating,
		isHalf: 5,
	};
	return (
		<div>
			<div className="container">
				<div className="reviewDetails">
					<div className="profileIcon">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPh-_HfjlFSK9CDChobn59DzHPrfQG9gmN2LgAfX5o7g&s"
							alt="Profile Icon"
							className="img-fluid"
						/>
					</div>
					<span className="m-3">by</span>
					<div className="name">{review.name}</div>
					<div className="rating">
						<ReactStars {...options} />
					</div>
				</div>
				<div className="comments">"{review.comment}"</div>
			</div>
		</div>
	);
};

export default ReviewCard;
