var express = require("express");
var router = express.Router();
var axios = require("axios").default;
const usersController = require("../controllers/users-controllers");
const checkAuth = require("../middleware/check-auth");
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

module.exports = router;
