import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { getUserDetails } from "../../actions/userLoginAction";
import Loader from "../Loader/Loader";
import "./Account.css";
import { useNavigate } from "react-router-dom";
const Account = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user = {}, loading } = useSelector((state) => state.user);
	const handleEditProfileBtn = (e) => {
		e.preventDefault();
		navigate("/editprofile");
	};
	const handleOrdersBtn = (e) => {
		e.preventDefault();
		navigate("/orders");
	};
	const handleChangePasswordBtn = (e) => {
		e.preventDefault();
		navigate("/updatepassword");
	};
	useEffect(() => {
		dispatch(getUserDetails());
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container fluid="sm">
					<Row xs={1} sm={2} md={2}>
						<Col>
							<div className="detailsBox">
								<div>
									<h1>Full Name</h1>
									<p>{user.name}</p>
								</div>
								<div>
									<h1>Email</h1>
									<p>{user.email}</p>
								</div>
								<div>
									<h1>Joined-On</h1>
									<p>{user.createdAt}10-22-2022</p>
								</div>
							</div>
						</Col>
						<Col>
							<div className="editProfileBox">
								<button onClick={handleOrdersBtn}>My Orders</button>
								<button onClick={handleEditProfileBtn}>Edit Profile</button>
								<button onClick={handleChangePasswordBtn}>
									Change Password
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};

export default Account;
