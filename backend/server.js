const dotenv = require("dotenv");
const app = require("./app");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/Db");
//uncaught exception error handler
process.on("uncaughtException", (e) => {
	console.log(`Error:${e.message}`);
	console.log(`Shutting down server  due to Uncaught exception: `);
	process.exit(1);
});

if (process.env.nodenv === "PRODUCTION") {
} else {
	//config
	dotenv.config({ path: `${__dirname}/config/config.env` });
}

//connecting to database
connectDatabase();

//cloudinary config
cloudinary.config({
	cloud_name: "dv5ml8hzh",
	api_key: "455273948777853",
	api_secret: "FaGp0q96IuMMKA2FQiQNy2gYvKo",
});

//server starter
const server = app.listen(process.env.port, () => {
	console.log(`Server is working on http://localhost:${process.env.port}`);
});

// Unhandled Promise REjection
process.on("unhandledRejection", (err) => {
	console.error(`Error : ${err.message}`);
	console.log(`Shutting down the server due to unhandled promise rejection`);
	server.close(() => {
		process.exit(1);
	});
});
