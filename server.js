const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const users = require("./routes/users");
const data = require("./routes/data");
const app = express();

mongoose
	.connect(process.env.MONGODB_CONNECT_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => console.log(err));

let whitelist = ["http://localhost:3000"];
var corsOptions = {
	credentials: true,
	optionsSuccessStatus: 200, // For legacy browser support
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) return callback(null, true);
		return callback(new Error("Not allowed by CORS"));
	},
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("Server running without error :)");
});

app.use("/api/users", users);
app.use("/api/data", data);
app.listen(port, () => {
	console.log(`app is listening at port `, port);
});
