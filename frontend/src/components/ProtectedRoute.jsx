import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader/Loader";
const ProtectedRoute = ({ isAdmin, children }) => {
	const { isAuthenticated, user, loading } = useSelector((state) => state.user);
	const navigate = useNavigate();
	if (loading === false) {
		if (!isAuthenticated) return navigate("/loginregister");
		if (isAdmin === true && user.role !== "admin")
			return navigate("/loginregister");
		return children;
	}
};

export default ProtectedRoute;
