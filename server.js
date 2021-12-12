const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const users = require("./routes/users");
const data = require("./routes/data");
const cors = require("cors");
const app = express();
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://user:user@123@cluster0.qcxwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.use("/api/users", users);
app.use("/api/data", data);
app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
