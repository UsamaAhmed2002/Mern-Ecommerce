import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import TourIcon from "@mui/icons-material/Tour";
import { Country, State, City } from "country-state-city";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps/CheckoutSteps";
import { useDispatch } from "react-redux";
import { SaveShippingInfo } from "../../Reducers/CartReducer";
const Checkout = () => {
	const [address, setAddress] = useState();
	const [country, setCountry] = useState();
	const [state, setState] = useState("");
	const [city, setCity] = useState();
	const [pincode, setPincode] = useState();
	const [phone, setPhone] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const handleInput = (e) => {
	// 	const { name, value } = e.target;
	// 	setData({ ...data, [name]: value });
	// };
	const data = { address, country, state, city, pincode, phone };
	const handleFormSubmit = (e) => {
		e.preventDefault();
		// console.log(data);
		dispatch(SaveShippingInfo(data));
		navigate("/confirmorder");
	};
	return (
		<Fragment>
			<MetaData title={"CheckOut"} />
			<CheckoutSteps activeSteps={0} />
			<div className="mainBox">
				<form className="shippingDetailsBox" onSubmit={handleFormSubmit}>
					<div className="shippingHeading">
						<h1>Shipping Details</h1>
					</div>
					<div className="inputContainer">
						<HomeIcon />
						<input
							required
							value={address}
							type="text"
							onChange={(e) => {
								setAddress(e.target.value);
							}}
							placeholder="Address"
						/>
					</div>
					<div className="inputContainer">
						<LocationOnIcon />
						<input
							type="number"
							required
							value={pincode}
							onChange={(e) => {
								setPincode(e.target.value);
							}}
							placeholder="PinCode"
						/>
					</div>
					<div className="inputContainer">
						<LocalPhoneIcon />
						<input
							required
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
							type="number"
							placeholder="Phone"
						/>
					</div>
					<div className="inputContainer">
						<PublicIcon />
						<select
							required
							value={country}
							onChange={(e) => {
								setCountry(e.target.value);
							}}
							placeholder="Country"
						>
							<option value="" disabled>
								Country
							</option>
							{Country &&
								Country.getAllCountries().map((item) => (
									<option key={item.isoCode} required value={item.isoCode}>
										{item.name}
									</option>
								))}
						</select>
					</div>
					<div className="inputContainer">
						<TourIcon />
						<select
							required
							value={state}
							onChange={(e) => {
								setState(e.target.value);
							}}
							placeholder="state"
						>
							<option value="" disabled>
								State
							</option>
							{State.getStatesOfCountry(country).map((item) => (
								<option key={item.isoCode} value={item.isoCode}>
									{item.name}
								</option>
							))}
						</select>
					</div>
					<div className="inputContainer">
						<LocationCityIcon />

						<input
							required
							value={city}
							type="text"
							onChange={(e) => {
								setCity(e.target.value);
							}}
							placeholder="City"
						/>
					</div>
					<div className="inputContainer ">
						<input type="submit" placeholder="Continue" />
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default Checkout;
