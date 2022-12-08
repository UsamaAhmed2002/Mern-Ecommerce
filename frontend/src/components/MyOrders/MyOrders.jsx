import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MyOrders } from "./../../actions/OrderActions";
import Loader from "./../Loader/Loader";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const AllOrders = () => {
	const dispatch = useDispatch();
	const { orders, error, isLoading } = useSelector((state) => state.MyOrders);
	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		dispatch(MyOrders());
	}, [dispatch, error]);

	const columns = [
		{ field: "id", headerName: "Order ID", width: 200, flex: 1 },
		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			flex: 0.5,
			cellClassName: (params) => {
				return params.getValue(params.id, "status") === "Delivered"
					? "green"
					: "red";
			},
		},
		{
			field: "itemsQty",
			headerName: "Items Quantity",
			width: 150,
			type: "number",
			flex: 0.5,
		},
		{
			field: "amount",
			headerName: "Amount",
			type: "number",
			width: 110,
			flex: 0.5,
		},
		{
			field: "actions",
			headerName: "Actions",
			type: "number",
			sortable: false,
			width: 160,
			flex: 0.5,
			renderCell: (params) => {
				return (
					<Link to={`/myorders/${params.getValue(params.id, "id")}`}>
						<InfoIcon />
					</Link>
				);
			},
		},
	];

	const rows = [];
	orders &&
		orders.forEach((item) => {
			rows.push({
				id: item._id,
				status: item.orderStatus,
				itemsQty: item.orderItems.length,
				amount: item.totalPrice,
			});
		});
	return (
		<Fragment>
			{isLoading ? (
				<Loader />
			) : (
				<Container className="MyOrdersPage">
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						experimentalFeatures={{ newEditingApi: true }}
					/>
					<h1></h1>
				</Container>
			)}
		</Fragment>
	);
};

export default AllOrders;
