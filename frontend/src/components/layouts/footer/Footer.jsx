import React from "react";
import "./footer.css";
import playstore from "./../../../assets/google-play-png-logo-3799.png";
import appstore from "./../../../assets/pngegg (1).png";
import { FiInstagram } from "react-icons/fi";
import { BsFacebook, BsYoutube } from "react-icons/bs";
const Footer = () => {
	return (
		<footer id="footer">
			<div className="leftFooter">
				<h4>DOWNLOAD OUR APP</h4>
				<p>Download App for Android and IOS mobile phone</p>
				<img src={playstore} alt="playstore" />
				<img src={appstore} alt="Appstore" />
			</div>

			<div className="midFooter">
				<h1>ECOMMERCE.</h1>
				<p>High Quality is our first priority</p>

				<p>Copyrights 2021 &copy; MeUsamaAhmed</p>
			</div>

			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a href="http://instagram.com/meabhisingh">Instagram</a>
				<a href="http://youtube.com/6packprogramemr">Youtube</a>
				<a href="http://instagram.com/meabhisingh">Facebook</a>
			</div>
		</footer>
	);
};

export default Footer;
