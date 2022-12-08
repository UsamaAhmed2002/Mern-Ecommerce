const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
	const transporter = nodeMailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		service: process.env.SMPT_SERVICE,
		auth: {
			user: process.env.SMPT_MAIL,
			pass: process.env.SMPT_PASSWORD,
		},
	});
	const mailOptions = {
		from: "samatechnical00@gmail.com",
		to: options.email,
		subject: options.subject,
		text: options.message,
	};
	await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
