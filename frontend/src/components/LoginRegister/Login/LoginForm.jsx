import React, { useEffect, useState } from "react";
import "./Loginform.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "./../../../actions/userLoginAction";
import { toast } from "react-toastify";
import Loader from "./../../Loader/Loader";
import { useNavigate, Link } from "react-router-dom";
const LoginForm = () => {
	//now handling and dispatching state for login user
	const dispatch = useDispatch();
	const { loading, error, isAuthenticated } = useSelector(
		(state) => state.user
	);
	const [user, setUser] = useState();
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(login(user));
	};
	const handleLoginUser = (e) => {
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
				<div className="input-box  mt-5">
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						onChange={handleLoginUser}
					/>
					<input
						type="password"
						name="password"
						required
						placeholder="Password"
						onChange={handleLoginUser}
					/>
					<Link className="forgotp" to={"/forgotpassword"}>
						Forgot Password?
					</Link>
					<button type="submit" className="loginbtn" onClick={handleLogin}>
						Log in
					</button>
				</div>
			)}
		</>
	);
};

export default LoginForm;
