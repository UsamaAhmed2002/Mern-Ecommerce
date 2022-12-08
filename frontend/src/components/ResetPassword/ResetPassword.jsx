import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	forgotPassword,
	resetPassword,
} from "../../actions/userLoginAction";
import { toast } from "react-toastify";
import "./ResetPassword.css";
import Loader from "../Loader/Loader";
const ResetPassword = () => {
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const dispatch = useDispatch();
	const { token } = useParams();
	const navigate = useNavigate();
	const { isUpdated, error, loading } = useSelector(
		(state) => state.updateUser
	);
	const handleResetBtn = (e) => {
		e.preventDefault();
		dispatch(resetPassword(token, password, confirmPassword));
	};
	useEffect(() => {
		if (isUpdated) {
			toast.success("Password Reset Successfull");
			setTimeout(() => {
				navigate("/loginregister");
			}, 2000);
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, isUpdated]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="mainContainer">
					<div className="inputBoxes">
						<input
							type="password"
							placeholder="New Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							name="confrimPassword"
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
						<button type="button" onClick={handleResetBtn}>
							Reset
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ResetPassword;
