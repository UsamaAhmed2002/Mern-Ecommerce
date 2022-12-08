import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getUserDetails,
	register,
	updatePassword,
	updateProfile,
} from "./../../actions/userLoginAction";
import "./UpdatePassword.css";
import { toast } from "react-toastify";
import Loader from "./../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [passwords, setPasswords] = useState();
	const handleInputValue = (e) => {
		const { name, value } = e.target;
		setPasswords({ ...passwords, [name]: value });
	};
	const { isUpdated, error, loading } = useSelector(
		(state) => state.updateUser
	);

	const handleUpdatePassword = (e) => {
		e.preventDefault();
		dispatch(updatePassword(passwords));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (isUpdated) {
			setTimeout(() => {
				navigate("/account");
			}, 1000);
			toast.success("Password Updated Successfully");
		}
	}, [error, isUpdated]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="mainContainer">
					<div className="inputBoxes">
						<input
							type="text"
							placeholder="Old Password"
							name="oldPassword"
							onChange={handleInputValue}
						/>
						<input
							type="text"
							placeholder="New Password"
							name="newPassword"
							onChange={handleInputValue}
						/>
						<input
							type="text"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleInputValue}
						/>
						<button type="button" onClick={handleUpdatePassword}>
							Update
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default UpdatePassword;
