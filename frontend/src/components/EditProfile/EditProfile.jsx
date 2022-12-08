import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getUserDetails,
	register,
	updateProfile,
} from "./../../actions/userLoginAction";
import "./EditProfile.css";
import { toast } from "react-toastify";
import Loader from "./../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstants";
const EditProfile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user = {} } = useSelector((state) => state.user);

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	//extracting state values
	const { loading, isUpdated, error } = useSelector(
		(state) => state.updateUser
	);

	//function for getting all data from inputs and setting it in state

	//function for updating user and send update data to user action
	const handleUpdateUser = (e) => {
		e.preventDefault();
		dispatch(updateProfile(name, email));
	};
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			toast.success("Profile Updated Successfully", {
				autoClose: 1000,
				closeOnClick: true,
				draggable: true,
			});
			setTimeout(() => {
				navigate(`/account`);
			}, 1000);
			dispatch(getUserDetails());
		}
		dispatch({
			type: UPDATE_PROFILE_RESET,
		});
	}, [dispatch, error, isUpdated]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="mainContainer">
						<h1>Update Profile</h1>
						<div className="inputBoxes">
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<button
								type="button"
								onClick={handleUpdateUser}
								className="updatebtn"
							>
								Update
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default EditProfile;
