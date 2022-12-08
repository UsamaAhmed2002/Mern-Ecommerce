import React, { useState } from "react";
import LoginForm from "./Login/LoginForm";
import "./LoginRegister.css";
import RegisterForm from "./REgister/RegisterForm";
import { useSelector } from "react-redux";
const LoginRegister = () => {
	const { isAuthneticated, loading } = useSelector((state) => state.user);
	const [form, setForm] = useState("LoginForm");
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="mainContainer">
					<div className="formContainer">
						<div className="buttons ">
							<button
								onClick={() => setForm("LoginForm")}
								className="login-btn"
							>
								Login
							</button>
							<button
								onClick={() => setForm("registerForm")}
								className="register-btn"
							>
								SignUp
							</button>
						</div>
						{form === "LoginForm" ? <LoginForm /> : <RegisterForm />}
					</div>
				</div>
			)}
		</>
	);
};

export default LoginRegister;
