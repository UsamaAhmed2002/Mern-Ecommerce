import React, { Fragment } from "react";
import "./SideBar.css";
import { TreeView, TreeItem } from "@mui/lab";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import ViewListIcon from "@mui/icons-material/ViewList";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
const SideBar = () => {
	return (
		<Fragment>
			<div className=" sidebar">
				<Link to={"/admin/dashboard"}>
					<DashboardIcon /> Dashboard
				</Link>
				<TreeView
					aria-label="file system navigator"
					defaultCollapseIcon={<ArrowForwardIosIcon />}
					defaultExpandIcon={<ArrowDownwardIcon />}
				>
					<TreeItem nodeId="1" label="Products">
						<Link to={"/admin/createproduct"} className="link">
							<TreeItem nodeId="2" label="Add Product " icon={<AddIcon />} />
						</Link>
						<Link to={"/admin/allproducts"} className="link">
							<TreeItem
								nodeId="3"
								label="All Products "
								icon={<AccountTreeIcon />}
							/>
						</Link>
					</TreeItem>
				</TreeView>
				<Link to={"/admin/users"}>
					<PeopleIcon /> All Users
				</Link>
				<Link to={"/admin/orders"}>
					<ViewListIcon /> All Orders
				</Link>
				<Link to={"/admin/reviews"}>
					<RateReviewIcon /> All Reviews
				</Link>
			</div>
		</Fragment>
	);
};

export default SideBar;
