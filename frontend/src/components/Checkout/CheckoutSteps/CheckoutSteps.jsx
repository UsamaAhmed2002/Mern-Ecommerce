import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import PaymentIcon from "@mui/icons-material/Payment";
import "./CheckoutSteps.css";
const CheckoutSteps = ({ activeSteps }) => {
	const steps = [
		{
			label: <Typography>Shipping Details</Typography>,
			icon: <LocalShippingIcon />,
		},
		{
			label: <Typography>Confrim Order</Typography>,
			icon: <FileDownloadDoneIcon />,
		},
		{
			label: <Typography>Payment</Typography>,
			icon: <PaymentIcon />,
		},
	];
	const styles = {
		boxSizing: "border-box",
	};
	return (
		<Fragment>
			<Stepper alternativeLabel activeStep={activeSteps}>
				{steps.map((item, i) => (
					<Step
						key={i}
						active={activeSteps === i ? true : false}
						completed={activeSteps >= i ? true : false}
					>
						<StepLabel icon={item.icon}>{item.label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Fragment>
	);
};

export default CheckoutSteps;
