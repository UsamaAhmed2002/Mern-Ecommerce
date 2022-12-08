import React, { Fragment } from "react";
import "./Success.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
const Success = () => {
	return (
		<Fragment>
			<div className="successMainContainer">
				<div className="successContainer">
					<CheckCircleIcon />
					<h1> Thankyou! for Placing an Order</h1>
					<Link to={"/myorders"}>Click To Check Your Placed Orders....!</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default Success;
