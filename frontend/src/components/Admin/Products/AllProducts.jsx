import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	clearSuccess,
	deleteProduct,
	GetAdminProducts,
} from "../../../actions/productActions";
import "./AllProducts.css";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { useState } from "react";
import SideBar from "../Dashboard/SideBar/SideBar";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CLEAR_SUCCESS } from "../../../constants/productConstants";

const AllProduct = () => {
	const dispatch = useDispatch();
	const [sideBarOpen, setSideBarOpen] = useState(false);
	//getting all products from the redux store
	const { products, isLoading, error } = useSelector(
		(state) => state.AdminProducts
	);

	//getting state when a product is deleted
	const {
		success,
		isLoading: disLoading,
		derror,
	} = useSelector((state) => state.DeleteProduct);
	//side bar Toggler For Side Bar
	const handleSideBarToggle = () => {
		sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true);
	};

	//handler for deleting a product
	const handeDeleteBtn = (e, id) => {
		e.preventDefault();
		dispatch(deleteProduct(id));
	};

	useEffect(() => {
		//toast for error
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (success) {
			toast.success("Product Deleted Successfully");
			dispatch(clearSuccess());
		}
		if (derror) {
			toast.error(derror);
			dispatch(clearErrors());
		}

		//dispatching the action on the Redux Store to get All Products
		dispatch(GetAdminProducts());

		//dispatchers for resetting state
	}, [dispatch, error, success, derror]);

	return (
		<>
			{isLoading || disLoading ? (
				<Loader />
			) : (
				<div className="mainProductsContainer">
					<button onClick={handleSideBarToggle}>
						<ClearAllIcon />
					</button>
					<div className={`${sideBarOpen ? "sideBar showSideBar" : "sideBar"}`}>
						<SideBar />
					</div>
					<h1 className="text-center">ALl Products</h1>

					<div
						className={`${
							sideBarOpen
								? "bgBlur table table-responsive container "
								: "table table-responsive container"
						}`}
					>
						<table className="table table-responsive table-hover table-striped align-middle">
							<thead>
								<tr>
									<th>#</th>
									<th>id</th>
									<th>Name</th>
									<th>Price</th>
									<th>Stock</th>
									<th>Ratings</th>
									<th>Catagory</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{products &&
									products.map((item, i) => (
										<tr key={item._id}>
											<td>{i}</td>
											<td>{item._id}</td>
											<td>{item.name}</td>
											<td>{item.price}</td>
											<td>{item.stock}</td>
											<td>{item.ratings}</td>
											<td>{item.catagory}</td>
											<td>
												<Link to={`/admin/editproduct/${item._id}`}>
													<BorderColorIcon />
												</Link>
												<button
													style={{ background: "transparent", border: "none" }}
													onClick={(e) => handeDeleteBtn(e, item._id)}
												>
													<DeleteOutlineIcon />
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default AllProduct;
