import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./Dashboard.css";
import SideBar from "./SideBar/SideBar";
import ClearAllIcon from "@mui/icons-material/ClearAll";
const Dashboard = () => {
	const [sideBarOpen, SetSideBarOpen] = useState(false);

	//side Bar Toggle Function
	const handleSideBarToggle = () => {
		sideBarOpen ? SetSideBarOpen(false) : SetSideBarOpen(true);
	};

	return (
		<Fragment>
			<Col className={`DashboardContainer `}>
				<div className={`${sideBarOpen ? "sideBar showSideBar" : "sideBar"}`}>
					<SideBar />
				</div>
				<button onClick={handleSideBarToggle}>
					<ClearAllIcon />
				</button>
				<div className={`ContentContainer }`}>
					<div className="heading">
						<h1>Dashboard</h1>
					</div>
					<div className="totalAmount">
						<h4>Total Amount $9338</h4>
					</div>
					<Container>
						<div className="CircleStatsContainer">
							<div>
								<h3>Products : 50</h3>
							</div>
							<div>
								<h3>Orders: 20</h3>
							</div>
							<div>
								<h3>Users: 4</h3>
							</div>
						</div>
					</Container>
				</div>
			</Col>
		</Fragment>
	);
};

export default Dashboard;
