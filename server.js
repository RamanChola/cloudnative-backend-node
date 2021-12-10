const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const cors = require("cors");
const port = process.env.PORT || 5000;
const users = require("./routes/users");
const data = require("./routes/data");
const app = express();

mongoose
  .connect("mongodb+srv://user:user@123@cluster0.qcxwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.use("/api/users", users);
app.use("/api/data", data);
app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

