const express = require("express");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
//config for  env file
if (process.env.nodenv === "PRODUCTION") {
} else {
	dotenv.config({ path: `${__dirname}/config/config.env` });
}
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
app.use(fileupload());
// Route Imports
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

//using all routes
app.use("/api/v1", productRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoute);

app.use(express.static(path.join(__dirname, "../frontend/dist/")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});
//error HAndler Middleware
app.use(errorMiddleware);
module.exports = app;
