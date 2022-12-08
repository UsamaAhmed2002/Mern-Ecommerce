import React, { Fragment, useState } from "react";
import {
	Backdrop,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
} from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../actions/userLoginAction.js";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
const UserActions = () => {
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector((state) => state.user);
	const { cartItems } = useSelector((state) => state.cart);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const option = [
		{ icon: <FormatListNumberedIcon />, name: "Orders", func: orders },
		{ icon: <PersonIcon />, name: "Account", func: account },
		{
			icon: (
				<ShoppingCartCheckoutIcon
					style={{ color: cartItems.length >= 0 ? "tomato" : "grey" }}
				/>
			),
			name: `Cart(${cartItems.length})`,
			func: cartBtn,
		},
		{ icon: <LogoutIcon />, name: "Logout", func: logoutuser },
	];
	if (user.role === "admin") {
		option.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: dashboard,
		});
	}
	function logoutuser() {
		dispatch(logout());
		toast.success("Logged Out Successfully!");
		navigate("/loginregister");
	}
	function account() {
		navigate("/account");
	}
	function orders() {
		navigate("/myorders");
	}
	function dashboard() {
		navigate("/admin/dashboard");
	}
	function cartBtn() {
		navigate("/cart");
	}
	return (
		<Fragment>
			<Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={open}></Backdrop>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{
					position: "fixed",
					top: 150,
					right: 50,
				}}
				icon={<PersonIcon />}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				direction="down"
			>
				{option.map((item) => (
					<SpeedDialAction
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
						tooltipOpen={window.innerWidth <= 600 ? true : false}
					/>
				))}
			</SpeedDial>
		</Fragment>
	);
};

export default UserActions;
