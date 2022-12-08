import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "reactstrap";
import { clearErrors, register } from "../../../actions/userLoginAction";
import "./Registerform.css";
import { toast } from "react-toastify";
import Loader from "./../../Loader/Loader";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, isAuthenticated, error } = useSelector(
		(state) => state.user
	);
	const [user, setUser] = useState();
	const handleRegisterUser = (e) => {
		e.preventDefault();
		dispatch(register(user));
	};
	const handleSetUser = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isAuthenticated) {
			navigate(`/account`);
		}
	}, [dispatch, error, isAuthenticated]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="inputBoxes">
						<input
							type="text"
							name="name"
							placeholder="Name"
							onChange={handleSetUser}
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							onChange={handleSetUser}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleSetUser}
						/>
					</div>
					<button
						type="submit"
						onClick={handleRegisterUser}
						className="registerbtn"
					>
						Register
					</button>
				</>
			)}
		</>
	);
};

export default RegisterForm;
