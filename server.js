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
    "mongodb+srv://user:Sy80Sg15imobImFX@cluster0.qcxwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

let whitelist = [
  "http://localhost:3000",
  "https://brimo.netlify.app",
  "http://flapped.xyz",
];
var corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server running without error :)");
});

app.use("/api/users", users);
app.use("/api/data", data);
app.listen(port, () => {
  console.log(`app is listening at port `, port);
});
