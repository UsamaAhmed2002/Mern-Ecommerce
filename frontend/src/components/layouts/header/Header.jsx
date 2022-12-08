import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsFillCartFill } from "react-icons/bs";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
const Header = () => {
	const [keyword, setKeyword] = useState("");
	const Navigate = useNavigate();
	const searchProduct = (e) => {
		e.preventDefault();
		Navigate(`/${keyword}`);
	};

	return (
		<div>
			<nav className={`navbar navbar-expand-lg navbar-light`}>
				<div className="container-fluid">
					<Link to={"/"} className="navbar-brand" href="#">
						Shopicom
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									to={"/"}
									className="nav-link text-dark "
									aria-current="page"
								>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/products"} className="nav-link text-dark">
									Products
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/contact"} className="nav-link text-dark">
									Contact
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/about"} className="nav-link text-dark">
									About
								</Link>
							</li>
							<form className="d-flex" onSubmit={(e) => searchProduct(e)}>
								<input
									className="searchinput text-center"
									type="text"
									placeholder="Search"
									onChange={(e) => setKeyword(e.target.value)}
								/>
								<button className="searchbtn" type="submit">
									Search
								</button>
							</form>
						</ul>
						<div className="icons">
							<div className="d-flex display-6">
								<div className="profileicon">
									<Link to={"/loginregister"} className="text-dark">
										<CgProfile />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
