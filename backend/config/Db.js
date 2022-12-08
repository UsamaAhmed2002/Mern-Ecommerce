const mongoose = require("mongoose");

const connectDatabase = () => {
	mongoose.connect(process.env.mongodburl).then((data) => {
		console.log(`Mongo Db connected with server : ${data.connection.host}`);
	});
};
module.exports = connectDatabase;
