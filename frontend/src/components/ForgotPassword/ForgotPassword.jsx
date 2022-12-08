import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userLoginAction";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import Loader from "../Loader/Loader";
import { FORGOT_PASSWORD_RESET } from "../../constants/UserConstants";
const ForgotPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState();
	const { loading, error, message } = useSelector(
		(state) => state.forgotPassword
	);
	const handleForgotPassword = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(email));
	};
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (message) {
			toast.success(message);
			setTimeout(() => {
				navigate("/loginregister");
			}, 2000);
			dispatch({ type: FORGOT_PASSWORD_RESET });
		}
	}, [dispatch, error, message]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="main">
					<form onSubmit={handleForgotPassword} className="inputBox">
						<input
							type="email"
							required={true}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
						/>
						<button type="submit">Send Email</button>
					</form>
				</div>
			)}
		</>
	);
};

export default ForgotPassword;
